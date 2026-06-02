const { z } = require("zod");

const feeStructureBody = z.object({
  category: z.string().min(2),
  amount: z.coerce.number().positive(),
  semester: z.coerce.number().int().min(1).max(12),
});

const createFeeStructureSchema = z.object({
  body: feeStructureBody,
});

const updateFeeStructureSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: feeStructureBody.partial().refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required",
  }),
});

module.exports = {
  createFeeStructureSchema,
  updateFeeStructureSchema,
};
