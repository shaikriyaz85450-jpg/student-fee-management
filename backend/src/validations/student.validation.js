const { z } = require("zod");
const { paginationQuery } = require("./common.validation");

const studentBody = z.object({
  rollNumber: z.string().min(1),
  name: z.string().min(2),
  department: z.string().min(2),
  semester: z.coerce.number().int().min(1).max(12),
  email: z.string().email(),
  phone: z.string().min(7).max(20).optional().nullable(),
  profilePhoto: z.string().url().optional().nullable(),
  password: z.string().min(8).optional(),
});

const createStudentSchema = z.object({
  body: studentBody,
});

const updateStudentSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: studentBody.partial().refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required",
  }),
});

const listStudentsSchema = z.object({
  query: paginationQuery.extend({
    search: z.string().optional(),
    department: z.string().optional(),
    semester: z.coerce.number().int().min(1).max(12).optional(),
  }),
});

module.exports = {
  createStudentSchema,
  updateStudentSchema,
  listStudentsSchema,
};
