const { z } = require("zod");
const { paginationQuery } = require("./common.validation");

const facultyBody = z.object({
  name: z.string().min(2),
  department: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8).optional(),
});

const createFacultySchema = z.object({
  body: facultyBody,
});

const updateFacultySchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: facultyBody.partial().refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required",
  }),
});

const listFacultySchema = z.object({
  query: paginationQuery.extend({
    search: z.string().optional(),
    department: z.string().optional(),
  }),
});

module.exports = {
  createFacultySchema,
  updateFacultySchema,
  listFacultySchema,
};
