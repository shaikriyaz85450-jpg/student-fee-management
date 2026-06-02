const prisma = require("../config/prisma");
const AppError = require("../utils/AppError");
const { generateReceiptNumber } = require("../utils/receipt");

const getActorStudentId = async (actor) => {
  if (actor.role !== "STUDENT") return null;

  const student = await prisma.student.findUnique({ where: { userId: actor.id } });
  if (!student) throw new AppError("Student profile not found for this user", 404);

  return student.id;
};

const listReceipts = async (actor) => {
  const actorStudentId = await getActorStudentId(actor);

  return prisma.receipt.findMany({
    where: actorStudentId ? { payment: { studentId: actorStudentId } } : {},
    orderBy: { generatedDate: "desc" },
    include: { payment: { include: { student: true } } },
  });
};

const getReceiptById = (id) =>
  prisma.receipt.findUniqueOrThrow({
    where: { id },
    include: { payment: { include: { student: true } } },
  });

const getReceiptForActor = async (id, actor) => {
  const receipt = await getReceiptById(id);

  if (actor.role === "STUDENT" && receipt.payment.student.userId !== actor.id) {
    throw new AppError("You are not allowed to access this receipt", 403);
  }

  return receipt;
};

const getReceiptByPaymentId = (paymentId) =>
  prisma.receipt.findUniqueOrThrow({
    where: { paymentId },
    include: { payment: { include: { student: true } } },
  });

const getReceiptByPaymentForActor = async (paymentId, actor) => {
  const receipt = await getReceiptByPaymentId(paymentId);

  if (actor.role === "STUDENT" && receipt.payment.student.userId !== actor.id) {
    throw new AppError("You are not allowed to access this receipt", 403);
  }

  return receipt;
};

const generateReceiptForPayment = async (paymentId) => {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: { receipt: true },
  });

  if (!payment) throw new AppError("Payment not found", 404);
  if (payment.status !== "PAID") throw new AppError("Receipt can be generated only for paid payments", 400);
  if (payment.receipt) return payment.receipt;

  return prisma.receipt.create({
    data: {
      paymentId,
      receiptNumber: generateReceiptNumber(),
    },
  });
};

module.exports = {
  listReceipts,
  getReceiptById,
  getReceiptForActor,
  getReceiptByPaymentId,
  getReceiptByPaymentForActor,
  generateReceiptForPayment,
};
