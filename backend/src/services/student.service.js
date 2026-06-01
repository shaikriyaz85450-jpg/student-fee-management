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

    return tx.student.create({
      data: {
        ...studentData,
        userId: user.id,
      },
    });
  });
};

const updateStudent = async (id, payload) => {
  const { password, ...studentData } = payload;

  return prisma.$transaction(async (tx) => {
    const student = await tx.student.update({
      where: { id },
      data: studentData,
    });

    if (student.userId) {
      await tx.user.update({
        where: { id: student.userId },
        data: {
          ...(studentData.name ? { name: studentData.name } : {}),
          ...(studentData.email ? { email: studentData.email } : {}),
          ...(password ? { password: await hashPassword(password) } : {}),
        },
      });
    }

    return student;
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
