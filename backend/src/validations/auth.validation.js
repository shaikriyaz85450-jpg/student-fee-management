const { z } = require("zod");

const loginSchema = z.object({
  body: z.object({
    identifier: z.string().min(1),
    password: z.string().min(6),
    role: z.enum(["STUDENT", "FACULTY", "ACCOUNTANT"]),
  }),
});

const registerUserSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(["STUDENT", "FACULTY", "ACCOUNTANT"]),
    department: z.string().min(2).optional(),
    phone: z.string().min(7).max(20).optional(),
    designation: z.string().min(2).optional(),
    profilePhoto: z.string().url().optional(),
    rollNumber: z.string().optional(),
    semester: z.number().int().optional(),
  }),
});

module.exports = {
  loginSchema,
  registerUserSchema,
};
