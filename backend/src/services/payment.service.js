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

    return tx.payment.findUnique({
      where: { id },
      include: { student: true, receipt: true },
    });
  });

const deletePayment = (id) => prisma.payment.delete({ where: { id } });

module.exports = {
  listPayments,
  getPaymentById,
  getPaymentForActor,
  createPayment,
  updatePayment,
  deletePayment,
};
