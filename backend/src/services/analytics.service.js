const prisma = require("../config/prisma");
const AppError = require("../utils/AppError");

const buildDateFilter = ({ from, to }) =>
  from || to
    ? {
        paymentDate: {
          ...(from ? { gte: from } : {}),
          ...(to ? { lte: to } : {}),
        },
      }
    : {};

const getCollectionAnalytics = async ({ from, to }) => {
  const dateFilter = buildDateFilter({ from, to });
  const where = { status: "PAID", ...dateFilter };

  const [summary, byCategory, byMode, recentPayments] = await prisma.$transaction([
    prisma.payment.aggregate({
      where,
      _sum: { amount: true },
      _count: { id: true },
    }),
    prisma.payment.groupBy({
      by: ["feeCategory"],
      where,
      _sum: { amount: true },
      _count: { id: true },
    }),
    prisma.payment.groupBy({
      by: ["paymentMode"],
      where,
      _sum: { amount: true },
      _count: { id: true },
    }),
    prisma.payment.findMany({
      where,
      take: 10,
      orderBy: { paymentDate: "desc" },
      include: { student: true, receipt: true },
    }),
  ]);

  return {
    totalCollected: summary._sum.amount || 0,
    totalTransactions: summary._count.id,
    byCategory,
    byMode,
    recentPayments,
  };
};

const getPendingFeeAnalytics = async ({ semester, department }) => {
  const studentWhere = {
    ...(semester ? { semester } : {}),
    ...(department ? { department } : {}),
  };

  const [students, feeStructures, pendingPayments] = await prisma.$transaction([
    prisma.student.findMany({
      where: studentWhere,
      include: { payments: { where: { status: "PAID" } } },
    }),
    prisma.feeStructure.findMany({ where: semester ? { semester } : {} }),
    prisma.payment.findMany({
      where: { status: "PENDING", student: studentWhere },
      include: { student: true },
    }),
  ]);

  const expectedBySemester = feeStructures.reduce((acc, fee) => {
    acc[fee.semester] = (acc[fee.semester] || 0) + Number(fee.amount);
    return acc;
  }, {});

  const studentsWithPending = students.map((student) => {
    const expected = expectedBySemester[student.semester] || 0;
    const paid = student.payments.reduce((sum, payment) => sum + Number(payment.amount), 0);
    return {
      studentId: student.id,
      rollNumber: student.rollNumber,
      name: student.name,
      department: student.department,
      semester: student.semester,
      expectedAmount: expected,
      paidAmount: paid,
      pendingAmount: Math.max(expected - paid, 0),
    };
  });

  return {
    totalStudents: students.length,
    pendingStudents: studentsWithPending.filter((item) => item.pendingAmount > 0).length,
    totalPendingAmount: studentsWithPending.reduce((sum, item) => sum + item.pendingAmount, 0),
    explicitPendingPayments: pendingPayments,
    students: studentsWithPending,
  };
};

const getStudentPaymentAnalytics = async (studentId, actor) => {
  const student = await prisma.student.findUniqueOrThrow({
    where: { id: studentId },
    include: { payments: { include: { receipt: true }, orderBy: { paymentDate: "desc" } } },
  });

  if (actor.role === "STUDENT" && student.userId !== actor.id) {
    throw new AppError("You are not allowed to access this student's analytics", 403);
  }

  const paidPayments = student.payments.filter((payment) => payment.status === "PAID");
  const totalPaid = paidPayments.reduce((sum, payment) => sum + Number(payment.amount), 0);

  const byCategory = paidPayments.reduce((acc, payment) => {
    acc[payment.feeCategory] = (acc[payment.feeCategory] || 0) + Number(payment.amount);
    return acc;
  }, {});

  return {
    student,
    totalPaid,
    totalPayments: student.payments.length,
    byCategory,
  };
};

const getDashboardOverview = async () => {
  const [studentCount, facultyCount, paidSummary, pendingCount, latestPayments] =
    await prisma.$transaction([
      prisma.student.count(),
      prisma.faculty.count(),
      prisma.payment.aggregate({
        where: { status: "PAID" },
        _sum: { amount: true },
        _count: { id: true },
      }),
      prisma.payment.count({ where: { status: "PENDING" } }),
      prisma.payment.findMany({
        take: 5,
        orderBy: { paymentDate: "desc" },
        include: { student: true, receipt: true },
      }),
    ]);

  return {
    studentCount,
    facultyCount,
    totalCollected: paidSummary._sum.amount || 0,
    paidTransactions: paidSummary._count.id,
    pendingPaymentCount: pendingCount,
    latestPayments,
  };
};

module.exports = {
  getCollectionAnalytics,
  getPendingFeeAnalytics,
  getStudentPaymentAnalytics,
  getDashboardOverview,
};
