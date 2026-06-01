const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const validate = require("../middleware/validate.middleware");
const { authenticate } = require("../middleware/auth.middleware");
const { loginSchema, registerUserSchema } = require("../validations/auth.validation");

router.post("/login", validate(loginSchema), authController.login);
router.post("/register", validate(registerUserSchema), authController.registerUser);
router.get("/me", authenticate, authController.me);

module.exports = router;
