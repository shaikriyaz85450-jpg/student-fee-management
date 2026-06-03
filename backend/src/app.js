const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const env = require("./config/env");
const apiRoutes = require("./routes");
const { notFoundHandler, errorHandler } = require("./middleware/error.middleware");

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.allowedOrigins,
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: "draft-8",
    legacyHeaders: false,
  })
);

app.use("/api/v1", apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
