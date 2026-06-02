const { Prisma } = require("@prisma/client");
const env = require("../config/env");
const AppError = require("../utils/AppError");

const handlePrismaError = (error) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return new AppError("Duplicate value violates a unique constraint", 409, {
        fields: error.meta?.target,
      });
    }

    if (error.code === "P2025") {
      return new AppError("Resource not found", 404);
    }
  }

  return error;
};

const notFoundHandler = (req, _res, next) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

const errorHandler = (err, _req, res, _next) => {
  const error = handlePrismaError(err);
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: error.isOperational ? error.message : "Internal server error",
    details: error.details || undefined,
    stack: env.nodeEnv === "development" ? error.stack : undefined,
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
