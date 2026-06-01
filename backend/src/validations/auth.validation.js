const { z } = require("zod");

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
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
  }),
});

module.exports = {
  loginSchema,
  registerUserSchema,
};
