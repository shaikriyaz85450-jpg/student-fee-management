const { z } = require("zod");
const { paginationQuery } = require("./common.validation");

const paymentBody = z.object({
  studentId: z.string().uuid(),
  amount: z.coerce.number().positive(),
  paymentDate: z.coerce.date().optional(),
  paymentMode: z.enum(["CASH", "CARD", "UPI", "NET_BANKING", "CHEQUE", "BANK_TRANSFER"]),
  status: z.enum(["PENDING", "PAID", "FAILED", "REFUNDED"]).default("PAID"),
  feeCategory: z.string().min(2),
});

const createPaymentSchema = z.object({
  body: paymentBody,
});

const updatePaymentSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: paymentBody.partial().refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required",
  }),
});

const listPaymentsSchema = z.object({
  query: paginationQuery.extend({
    studentId: z.string().uuid().optional(),
    status: z.enum(["PENDING", "PAID", "FAILED", "REFUNDED"]).optional(),
    feeCategory: z.string().optional(),
    from: z.coerce.date().optional(),
    to: z.coerce.date().optional(),
  }),
});

module.exports = {
  createPaymentSchema,
  updatePaymentSchema,
  listPaymentsSchema,
};
