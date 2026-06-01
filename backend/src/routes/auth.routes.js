const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const validate = require("../middleware/validate.middleware");
const { authenticate, authorize } = require("../middleware/auth.middleware");
const { loginSchema, registerUserSchema } = require("../validations/auth.validation");

router.post("/login", validate(loginSchema), authController.login);
router.post(
  "/register",
  authenticate,
  authorize("ACCOUNTANT"),
  validate(registerUserSchema),
  authController.registerUser
);
router.get("/me", authenticate, authController.me);

module.exports = router;
