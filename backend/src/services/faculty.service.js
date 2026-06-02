const prisma = require("../config/prisma");
const { hashPassword } = require("../utils/password");

const listFaculty = async ({ page, limit, search, department }) => {
  const skip = (page - 1) * limit;
  const where = {
    ...(department ? { department } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [data, total] = await prisma.$transaction([
    prisma.faculty.findMany({ where, skip, take: limit, orderBy: { createdAt: "desc" } }),
    prisma.faculty.count({ where }),
  ]);

  return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};

const getFacultyById = (id) => prisma.faculty.findUniqueOrThrow({ where: { id } });

const createFaculty = async (payload) => {
  const { password, ...facultyData } = payload;

  return prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name: facultyData.name,
        email: facultyData.email,
        role: "FACULTY",
        password: await hashPassword(password || "Faculty@123"),
      },
    });

    return tx.faculty.create({ data: { ...facultyData, userId: user.id } });
  });
};

const updateFaculty = async (id, payload) => {
  const { password, ...facultyData } = payload;

  return prisma.$transaction(async (tx) => {
    const faculty = await tx.faculty.update({ where: { id }, data: facultyData });

    if (faculty.userId) {
      await tx.user.update({
        where: { id: faculty.userId },
        data: {
          ...(facultyData.name ? { name: facultyData.name } : {}),
          ...(facultyData.email ? { email: facultyData.email } : {}),
          ...(password ? { password: await hashPassword(password) } : {}),
        },
      });
    }

    return faculty;
  });
};

const deleteFaculty = (id) => prisma.faculty.delete({ where: { id } });

module.exports = {
  listFaculty,
  getFacultyById,
  createFaculty,
  updateFaculty,
  deleteFaculty,
};
