const { z } = require("zod");

const analyticsQuerySchema = z.object({
  query: z.object({
    from: z.coerce.date().optional(),
    to: z.coerce.date().optional(),
    semester: z.coerce.number().int().min(1).max(12).optional(),
    department: z.string().optional(),
  }),
});

module.exports = {
  analyticsQuerySchema,
};
