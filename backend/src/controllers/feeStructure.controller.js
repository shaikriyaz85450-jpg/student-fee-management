const feeStructureService = require("../services/feeStructure.service");
const asyncHandler = require("../utils/asyncHandler");

const listFeeStructures = asyncHandler(async (_req, res) => {
  const data = await feeStructureService.listFeeStructures();
  res.json({ success: true, data });
});

const getFeeStructure = asyncHandler(async (req, res) => {
  const data = await feeStructureService.getFeeStructureById(req.params.id);
  res.json({ success: true, data });
});

const createFeeStructure = asyncHandler(async (req, res) => {
  const data = await feeStructureService.createFeeStructure(req.validated.body);
  res.status(201).json({ success: true, data });
});

const updateFeeStructure = asyncHandler(async (req, res) => {
  const data = await feeStructureService.updateFeeStructure(req.params.id, req.validated.body);
  res.json({ success: true, data });
});

const deleteFeeStructure = asyncHandler(async (req, res) => {
  await feeStructureService.deleteFeeStructure(req.params.id);
  res.status(204).send();
});

module.exports = {
  listFeeStructures,
  getFeeStructure,
  createFeeStructure,
  updateFeeStructure,
  deleteFeeStructure,
};
