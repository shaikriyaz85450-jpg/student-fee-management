const prisma = require("../config/prisma");

const listFeeStructures = () =>
  prisma.feeStructure.findMany({ orderBy: [{ semester: "asc" }, { category: "asc" }] });

const getFeeStructureById = (id) => prisma.feeStructure.findUniqueOrThrow({ where: { id } });

const createFeeStructure = (payload) => prisma.feeStructure.create({ data: payload });

const updateFeeStructure = (id, payload) =>
  prisma.feeStructure.update({ where: { id }, data: payload });

const deleteFeeStructure = (id) => prisma.feeStructure.delete({ where: { id } });

module.exports = {
  listFeeStructures,
  getFeeStructureById,
  createFeeStructure,
  updateFeeStructure,
  deleteFeeStructure,
};
