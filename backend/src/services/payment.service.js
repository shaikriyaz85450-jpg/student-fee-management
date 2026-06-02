const prisma = require("../config/prisma");
const AppError = require("../utils/AppError");
const { generateReceiptNumber } = require("../utils/receipt");

const getActorStudentId = async (actor) => {
  if (actor.role !== "STUDENT") return null;

  const student = await prisma.student.findUnique({ where: { userId: actor.id } });
  if (!student) throw new AppError("Student profile not found for this user", 404);

  return student.id;
};

const listPayments = async ({ page, limit, studentId, status, feeCategory, from, to }, actor) => {
  const skip = (page - 1) * limit;
  const actorStudentId = await getActorStudentId(actor);
  const where = {
    ...(actorStudentId ? { studentId: actorStudentId } : studentId ? { studentId } : {}),
    ...(status ? { status } : {}),
    ...(feeCategory ? { feeCategory } : {}),
    ...(from || to
      ? {
          paymentDate: {
            ...(from ? { gte: from } : {}),
            ...(to ? { lte: to } : {}),
          },
        }
      : {}),
  };

  const [data, total] = await prisma.$transaction([
    prisma.payment.findMany({
      where,
      skip,
      take: limit,
      orderBy: { paymentDate: "desc" },
      include: { student: true, receipt: true },
    }),
    prisma.payment.count({ where }),
  ]);

  return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};

const getPaymentById = (id) =>
  prisma.payment.findUniqueOrThrow({
    where: { id },
    include: { student: true, receipt: true },
  });

const getPaymentForActor = async (id, actor) => {
  const payment = await getPaymentById(id);

  if (actor.role === "STUDENT" && payment.student.userId !== actor.id) {
    throw new AppError("You are not allowed to access this payment", 403);
  }

  return payment;
};

const createPayment = async (payload) =>
  prisma.$transaction(async (tx) => {
    const payment = await tx.payment.create({ data: payload });

    if (payment.status === "PAID") {
      await tx.receipt.create({
        data: {
          paymentId: payment.id,
          receiptNumber: generateReceiptNumber(),
        },
      });
    }

    // Recalculate student totals and fee status
    if (payment.studentId) {
      const agg = await tx.payment.aggregate({
        _sum: { amount: true },
        where: { studentId: payment.studentId, status: "PAID" },
      });

      const paidSum = agg._sum.amount || 0;

      const student = await tx.student.findUnique({ where: { id: payment.studentId } });
      const totalFee = student?.totalFee || 0;
      const paidAmount = paidSum;
      const pendingAmount = (typeof totalFee === 'object' ? Number(totalFee.toString()) : Number(totalFee)) - (typeof paidAmount === 'object' ? Number(paidAmount.toString()) : Number(paidAmount));
      const normalizedPending = pendingAmount > 0 ? pendingAmount : 0;

      let feeStatus = "PENDING";
      if (normalizedPending === 0) feeStatus = "PAID";
      else if (paidAmount > 0 && normalizedPending > 0) feeStatus = "PARTIAL";

      await tx.student.update({
        where: { id: payment.studentId },
        data: {
          paidAmount: paidAmount,
          pendingAmount: normalizedPending,
          feeStatus,
        },
      });
    }

    return tx.payment.findUnique({
      where: { id: payment.id },
      include: { student: true, receipt: true },
    });
  });

const updatePayment = async (id, payload) =>
  prisma.$transaction(async (tx) => {
    const payment = await tx.payment.update({ where: { id }, data: payload });
    const existingReceipt = await tx.receipt.findUnique({ where: { paymentId: id } });

    if (payment.status === "PAID" && !existingReceipt) {
      await tx.receipt.create({
        data: {
          paymentId: payment.id,
          receiptNumber: generateReceiptNumber(),
        },
      });
    }

    // Recalculate student totals and fee status
    if (payment.studentId) {
      const agg = await tx.payment.aggregate({
        _sum: { amount: true },
        where: { studentId: payment.studentId, status: "PAID" },
      });

      const paidSum = agg._sum.amount || 0;
      const student = await tx.student.findUnique({ where: { id: payment.studentId } });
      const totalFee = student?.totalFee || 0;
      const paidAmount = paidSum;
      const pendingAmount = (typeof totalFee === 'object' ? Number(totalFee.toString()) : Number(totalFee)) - (typeof paidAmount === 'object' ? Number(paidAmount.toString()) : Number(paidAmount));
      const normalizedPending = pendingAmount > 0 ? pendingAmount : 0;

      let feeStatus = "PENDING";
      if (normalizedPending === 0) feeStatus = "PAID";
      else if (paidAmount > 0 && normalizedPending > 0) feeStatus = "PARTIAL";

      await tx.student.update({
        where: { id: payment.studentId },
        data: {
          paidAmount: paidAmount,
          pendingAmount: normalizedPending,
          feeStatus,
        },
      });
    }

    return tx.payment.findUnique({
      where: { id },
      include: { student: true, receipt: true },
    });
  });

const deletePayment = async (id) =>
  prisma.$transaction(async (tx) => {
    const payment = await tx.payment.delete({ where: { id } });

    if (payment.studentId) {
      const agg = await tx.payment.aggregate({
        _sum: { amount: true },
        where: { studentId: payment.studentId, status: "PAID" },
      });

      const paidSum = agg._sum.amount || 0;
      const student = await tx.student.findUnique({ where: { id: payment.studentId } });
      const totalFee = student?.totalFee || 0;
      const paidAmount = paidSum;
      const pendingAmount = (typeof totalFee === 'object' ? Number(totalFee.toString()) : Number(totalFee)) - (typeof paidAmount === 'object' ? Number(paidAmount.toString()) : Number(paidAmount));
      const normalizedPending = pendingAmount > 0 ? pendingAmount : 0;

      let feeStatus = "PENDING";
      if (normalizedPending === 0) feeStatus = "PAID";
      else if (paidAmount > 0 && normalizedPending > 0) feeStatus = "PARTIAL";

      await tx.student.update({
        where: { id: payment.studentId },
        data: {
          paidAmount: paidAmount,
          pendingAmount: normalizedPending,
          feeStatus,
        },
      });
    }

    return payment;
  });

module.exports = {
  listPayments,
  getPaymentById,
  getPaymentForActor,
  createPayment,
  updatePayment,
  deletePayment,
};
