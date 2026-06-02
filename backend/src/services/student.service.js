const prisma = require("../config/prisma");
const { hashPassword } = require("../utils/password");

const buildStudentWhere = ({ search, department, semester }) => ({
  ...(department ? { department } : {}),
  ...(semester ? { semester } : {}),
  ...(search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { rollNumber: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      }
    : {}),
});

const listStudents = async ({ page, limit, search, department, semester }) => {
  const skip = (page - 1) * limit;
  const where = buildStudentWhere({ search, department, semester });

  const [data, total] = await prisma.$transaction([
    prisma.student.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { payments: { orderBy: { paymentDate: "desc" }, take: 3 } },
    }),
    prisma.student.count({ where }),
  ]);

  return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};

const getStudentById = (id) =>
  prisma.student.findUniqueOrThrow({
    where: { id },
    include: { payments: { include: { receipt: true }, orderBy: { paymentDate: "desc" } } },
  });

const getStudentByUserId = (userId) =>
  prisma.student.findUniqueOrThrow({
    where: { userId },
    include: { payments: { include: { receipt: true }, orderBy: { paymentDate: "desc" } } },
  });

const calculateTotalFee = async (tx, semester) => {
  const fees = await tx.feeStructure.findMany({
    where: { semester },
  });
  return fees.reduce((sum, fee) => sum + Number(fee.amount), 0);
};

const createStudent = async (payload) => {
  const { password, ...studentData } = payload;

  return prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name: studentData.name,
        email: studentData.email,
        role: "STUDENT",
        password: await hashPassword(password || "Student@123"),
      },
    });

    const totalFee = await calculateTotalFee(tx, studentData.semester);

    return tx.student.create({
      data: {
        ...studentData,
        userId: user.id,
        totalFee: totalFee,
        pendingAmount: totalFee,
        feeStatus: "PENDING",
      },
    });
  });
};

const updateStudent = async (id, payload) => {
  const { password, ...studentData } = payload;

  return prisma.$transaction(async (tx) => {
    const oldStudent = await tx.student.findUnique({ where: { id } });
    
    let totalFee = oldStudent.totalFee;
    if (studentData.semester !== undefined && studentData.semester !== oldStudent.semester) {
      totalFee = await calculateTotalFee(tx, studentData.semester);
    }

    const student = await tx.student.update({
      where: { id },
      data: {
        ...studentData,
        ...(studentData.semester !== undefined ? { totalFee } : {}),
      },
    });

    // Recalculate pending and status
    let paidAmount = typeof student.paidAmount === 'object' ? Number(student.paidAmount.toString()) : Number(student.paidAmount);
    let sTotalFee = typeof student.totalFee === 'object' ? Number(student.totalFee.toString()) : Number(student.totalFee);
    let pendingAmount = Math.max(sTotalFee - paidAmount, 0);
    
    let feeStatus = "PENDING";
    if (pendingAmount === 0) feeStatus = "PAID";
    else if (paidAmount > 0 && pendingAmount > 0) feeStatus = "PARTIAL";

    // Manual override if provided in payload
    if (studentData.feeStatus) {
      feeStatus = studentData.feeStatus;
      if (feeStatus === "PAID") {
        pendingAmount = 0;
        paidAmount = sTotalFee;
      } else if (feeStatus === "PENDING") {
        pendingAmount = sTotalFee;
        paidAmount = 0;
      }
    }

    const updatedStudent = await tx.student.update({
      where: { id },
      data: {
        paidAmount,
        pendingAmount,
        feeStatus,
      },
    });

    if (updatedStudent.userId) {
      await tx.user.update({
        where: { id: updatedStudent.userId },
        data: {
          ...(studentData.name ? { name: studentData.name } : {}),
          ...(studentData.email ? { email: studentData.email } : {}),
          ...(password ? { password: await hashPassword(password) } : {}),
        },
      });
    }

    return updatedStudent;
  });
};

const deleteStudent = (id) => prisma.student.delete({ where: { id } });

module.exports = {
  listStudents,
  getStudentById,
  getStudentByUserId,
  createStudent,
  updateStudent,
  deleteStudent,
};
