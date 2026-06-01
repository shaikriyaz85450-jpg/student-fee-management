const router = require("express").Router();
const paymentController = require("../controllers/payment.controller");
const validate = require("../middleware/validate.middleware");
const { authenticate, authorize } = require("../middleware/auth.middleware");
const { uuidParam } = require("../validations/common.validation");
const {
  createPaymentSchema,
  updatePaymentSchema,
  listPaymentsSchema,
} = require("../validations/payment.validation");

router.use(authenticate);

router
  .route("/")
  .get(authorize("STUDENT", "FACULTY", "ACCOUNTANT"), validate(listPaymentsSchema), paymentController.listPayments)
  .post(authorize("ACCOUNTANT"), validate(createPaymentSchema), paymentController.createPayment);

router
  .route("/:id")
  .get(authorize("STUDENT", "FACULTY", "ACCOUNTANT"), validate(uuidParam), paymentController.getPayment)
  .put(authorize("ACCOUNTANT"), validate(updatePaymentSchema), paymentController.updatePayment)
  .delete(authorize("ACCOUNTANT"), validate(uuidParam), paymentController.deletePayment);

module.exports = router;
