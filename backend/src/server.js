const app = require("./app");
const env = require("./config/env");
const prisma = require("./config/prisma");

const server = app.listen(env.port, () => {
  console.log(`API server running on http://localhost:${env.port}`);
});

const shutdown = async (signal) => {
  console.log(`${signal} received. Shutting down API server.`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
