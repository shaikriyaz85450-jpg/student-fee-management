const prisma = require("../config/prisma");
const AppError = require("../utils/AppError");
const { comparePassword, hashPassword } = require("../utils/password");
const { signAccessToken } = require("../utils/jwt");

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  profile:
    user.role === "STUDENT"
      ? user.student
      : user.role === "FACULTY"
        ? user.faculty
        : user.accountant,
});

const recordLoginActivity = ({ userId, identifier, role, success, ipAddress, userAgent, message }) =>
  prisma.loginActivity.create({
    data: { userId, identifier, role, success, ipAddress, userAgent, message },
  });

const findLoginUser = ({ identifier, role }) => {
  const normalized = identifier.trim();

  if (role === "STUDENT") {
    return prisma.user.findFirst({
      where: {
        role,
        OR: [
          { email: { equals: normalized, mode: "insensitive" } },
          { student: { is: { rollNumber: { equals: normalized, mode: "insensitive" } } } },
        ],
      },
      include: { student: true },
    });
  }

  return prisma.user.findFirst({
    where: { role, email: { equals: normalized, mode: "insensitive" } },
    include: {
      ...(role === "FACULTY" ? { faculty: true } : {}),
      ...(role === "ACCOUNTANT" ? { accountant: true } : {}),
    },
  });
};

const hasRequiredProfile = (user, role) => {
  if (role === "STUDENT") return Boolean(user.student);
  if (role === "FACULTY") return Boolean(user.faculty);
  return Boolean(user.accountant);
};

const login = async ({ identifier, password, role, ipAddress, userAgent }) => {
  const user = await findLoginUser({ identifier, role });

  if (!user || !hasRequiredProfile(user, role)) {
    await recordLoginActivity({
      identifier,
      role,
      success: false,
      ipAddress,
      userAgent,
      message: "Account or role profile not found",
    });
    throw new AppError("Invalid email, password, or role", 401);
  }

  const isValidPassword = await comparePassword(password, user.password);

  if (!isValidPassword) {
    await recordLoginActivity({
      userId: user.id,
      identifier,
      role,
      success: false,
      ipAddress,
      userAgent,
      message: "Invalid password",
    });
    throw new AppError("Invalid email, password, or role", 401);
  }

  await recordLoginActivity({
    userId: user.id,
    identifier,
    role,
    success: true,
    ipAddress,
    userAgent,
    message: "Login successful",
  });

  return {
    user: sanitizeUser(user),
    accessToken: signAccessToken(user),
  };
};

const registerUser = async ({ name, email, password, role, rollNumber, semester, department, phone, designation, profilePhoto }) => {
  const user = await prisma.$transaction(async (tx) => {
    const createdUser = await tx.user.create({
      data: {
        name,
        email,
        role,
        password: await hashPassword(password),
      },
    });

    if (role === "STUDENT") {
      await tx.student.create({
        data: {
          userId: createdUser.id,
          name,
          email,
          rollNumber: rollNumber || `S${Date.now().toString().slice(-6)}`,
          semester: semester || 1,
          department: department || "General",
          phone: phone || null,
          totalFee: 0,
          pendingAmount: 0,
          feeStatus: "PENDING",
        },
      });
    }

    if (role === "FACULTY") {
      await tx.faculty.create({
        data: {
          userId: createdUser.id,
          name,
          email,
          department: department || "General",
          ...(phone ? { phone } : {}),
          ...(designation ? { designation } : {}),
          ...(profilePhoto ? { profilePhoto } : {}),
        },
      });
    }

    if (role === "ACCOUNTANT") {
      await tx.accountant.create({
        data: {
          userId: createdUser.id,
          name,
          email,
          ...(phone ? { phone } : {}),
          ...(designation ? { designation } : {}),
          ...(profilePhoto ? { profilePhoto } : {}),
        },
      });
    }

    return createdUser;
  });

  return sanitizeUser(user);
};

const updateProfile = async (userId, role, payload) => {
  const { name, email, password, ...profileData } = payload;

  return prisma.$transaction(async (tx) => {
    // 1. Update User table
    const updatedUser = await tx.user.update({
      where: { id: userId },
      data: {
        ...(name ? { name } : {}),
        ...(email ? { email } : {}),
        ...(password ? { password: await hashPassword(password) } : {}),
      },
    });

    // 2. Update Role-specific profile
    if (role === "STUDENT") {
      await tx.student.update({
        where: { userId },
        data: {
          ...(name ? { name } : {}),
          ...(email ? { email } : {}),
          ...profileData,
        },
      });
    } else if (role === "FACULTY") {
      await tx.faculty.update({
        where: { userId },
        data: {
          ...(name ? { name } : {}),
          ...(email ? { email } : {}),
          ...profileData,
        },
      });
    } else if (role === "ACCOUNTANT") {
      await tx.accountant.update({
        where: { userId },
        data: {
          ...(name ? { name } : {}),
          ...(email ? { email } : {}),
          ...profileData,
        },
      });
    }

    const finalUser = await tx.user.findUnique({
      where: { id: userId },
      include: { student: true, faculty: true, accountant: true },
    });

    return sanitizeUser(finalUser);
  });
};

module.exports = {
  login,
  registerUser,
  updateProfile,
};
