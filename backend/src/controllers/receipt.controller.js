const receiptService = require("../services/receipt.service");
const asyncHandler = require("../utils/asyncHandler");

const listReceipts = asyncHandler(async (req, res) => {
  const receipts = await receiptService.listReceipts(req.user);
  res.json({ success: true, data: receipts });
});

const getReceipt = asyncHandler(async (req, res) => {
  const receipt = await receiptService.getReceiptForActor(req.params.id, req.user);
  res.json({ success: true, data: receipt });
});

const getReceiptByPayment = asyncHandler(async (req, res) => {
  const receipt = await receiptService.getReceiptByPaymentForActor(req.params.id, req.user);
  res.json({ success: true, data: receipt });
});

const generateReceipt = asyncHandler(async (req, res) => {
  const receipt = await receiptService.generateReceiptForPayment(req.params.id);
  res.status(201).json({ success: true, data: receipt });
});

module.exports = {
  listReceipts,
  getReceipt,
  getReceiptByPayment,
  generateReceipt,
};
