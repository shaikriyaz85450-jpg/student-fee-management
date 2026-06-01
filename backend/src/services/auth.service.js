const prisma = require("../config/prisma");
const AppError = require("../utils/AppError");
const { comparePassword, hashPassword } = require("../utils/password");
const { signAccessToken } = require("../utils/jwt");

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

const login = async ({ email, password, role }) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.role !== role) {
    throw new AppError("Invalid email, password, or role", 401);
  }

  const isValidPassword = await comparePassword(password, user.password);

  if (!isValidPassword) {
    throw new AppError("Invalid email, password, or role", 401);
  }

  return {
    user: sanitizeUser(user),
    accessToken: signAccessToken(user),
  };
};

const registerUser = async ({ name, email, password, role }) => {
  const user = await prisma.user.create({
    data: {
      name,
      email,
      role,
      password: await hashPassword(password),
    },
  });

  return sanitizeUser(user);
};

module.exports = {
  login,
  registerUser,
};
