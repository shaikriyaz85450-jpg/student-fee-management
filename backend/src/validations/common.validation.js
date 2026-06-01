const { z } = require("zod");

const uuidParam = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

const paginationQuery = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

module.exports = {
  uuidParam,
  paginationQuery,
};
