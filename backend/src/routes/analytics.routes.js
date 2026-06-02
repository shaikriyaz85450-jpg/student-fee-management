const router = require("express").Router();
const analyticsController = require("../controllers/analytics.controller");
const validate = require("../middleware/validate.middleware");
const { authenticate, authorize } = require("../middleware/auth.middleware");
const { uuidParam } = require("../validations/common.validation");
const { analyticsQuerySchema } = require("../validations/analytics.validation");

router.use(authenticate);

router.get(
  "/dashboard",
  authorize("FACULTY", "ACCOUNTANT"),
  analyticsController.dashboardOverview
);
router.get(
  "/collections",
  authorize("ACCOUNTANT"),
  validate(analyticsQuerySchema),
  analyticsController.collectionAnalytics
);
router.get(
  "/pending-fees",
  authorize("FACULTY", "ACCOUNTANT"),
  validate(analyticsQuerySchema),
  analyticsController.pendingFeeAnalytics
);
router.get(
  "/students/:id/payments",
  authorize("STUDENT", "FACULTY", "ACCOUNTANT"),
  validate(uuidParam),
  analyticsController.studentPaymentAnalytics
);

module.exports = router;
