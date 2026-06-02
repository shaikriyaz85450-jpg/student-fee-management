const router = require("express").Router();

router.get("/health", (_req, res) => {
  res.json({ success: true, message: "Student Fee Management API is running" });
});

router.use("/auth", require("./auth.routes"));
router.use("/students", require("./student.routes"));
router.use("/faculty", require("./faculty.routes"));
router.use("/payments", require("./payment.routes"));
router.use("/receipts", require("./receipt.routes"));
router.use("/fee-structures", require("./feeStructure.routes"));
router.use("/analytics", require("./analytics.routes"));

module.exports = router;
