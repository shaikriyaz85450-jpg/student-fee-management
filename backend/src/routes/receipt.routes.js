const router = require("express").Router();
const receiptController = require("../controllers/receipt.controller");
const validate = require("../middleware/validate.middleware");
const { authenticate, authorize } = require("../middleware/auth.middleware");
const { uuidParam } = require("../validations/common.validation");

router.use(authenticate);

router.get("/", authorize("STUDENT", "FACULTY", "ACCOUNTANT"), receiptController.listReceipts);
router.get("/:id", authorize("STUDENT", "FACULTY", "ACCOUNTANT"), validate(uuidParam), receiptController.getReceipt);
router.get(
  "/payment/:id",
  authorize("STUDENT", "FACULTY", "ACCOUNTANT"),
  validate(uuidParam),
  receiptController.getReceiptByPayment
);
router.post(
  "/payment/:id",
  authorize("ACCOUNTANT"),
  validate(uuidParam),
  receiptController.generateReceipt
);

module.exports = router;
