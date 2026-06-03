const dotenv = require("dotenv");

dotenv.config({ quiet: true });

const requiredEnv = ["DATABASE_URL", "JWT_SECRET"];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const builtInOrigins = [
  "http://localhost:3000",
  "https://student-fee-management-3.onrender.com",
];

const parseOrigins = (value) =>
  value
    ? value
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean)
    : [];

const allowedOrigins = [
  ...new Set([...builtInOrigins, ...parseOrigins(process.env.FRONTEND_URL)]),
];

module.exports = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
  allowedOrigins,
};
