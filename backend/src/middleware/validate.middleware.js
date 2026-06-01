const AppError = require("../utils/AppError");

const validate = (schema) => (req, _res, next) => {
  const result = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query,
  });

  if (!result.success) {
    return next(
      new AppError("Validation failed", 400, result.error.issues)
    );
  }

  req.validated = result.data;
  return next();
};

module.exports = validate;
