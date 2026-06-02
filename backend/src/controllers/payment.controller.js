const paymentService = require("../services/payment.service");
const asyncHandler = require("../utils/asyncHandler");

const listPayments = asyncHandler(async (req, res) => {
  const data = await paymentService.listPayments(req.validated.query, req.user);
  res.json({ success: true, ...data });
});

const getPayment = asyncHandler(async (req, res) => {
  const payment = await paymentService.getPaymentForActor(req.params.id, req.user);
  res.json({ success: true, data: payment });
});

const createPayment = asyncHandler(async (req, res) => {
  const payment = await paymentService.createPayment(req.validated.body);
  res.status(201).json({ success: true, data: payment });
});

const updatePayment = asyncHandler(async (req, res) => {
  const payment = await paymentService.updatePayment(req.params.id, req.validated.body);
  res.json({ success: true, data: payment });
});

const deletePayment = asyncHandler(async (req, res) => {
  await paymentService.deletePayment(req.params.id);
  res.status(204).send();
});

module.exports = {
  listPayments,
  getPayment,
  createPayment,
  updatePayment,
  deletePayment,
};
