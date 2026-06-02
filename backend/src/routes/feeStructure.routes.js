const router = require("express").Router();
const feeStructureController = require("../controllers/feeStructure.controller");
const validate = require("../middleware/validate.middleware");
const { authenticate, authorize } = require("../middleware/auth.middleware");
const { uuidParam } = require("../validations/common.validation");
const {
  createFeeStructureSchema,
  updateFeeStructureSchema,
} = require("../validations/feeStructure.validation");

router.use(authenticate);

router
  .route("/")
  .get(authorize("STUDENT", "FACULTY", "ACCOUNTANT"), feeStructureController.listFeeStructures)
  .post(authorize("ACCOUNTANT"), validate(createFeeStructureSchema), feeStructureController.createFeeStructure);

router
  .route("/:id")
  .get(authorize("STUDENT", "FACULTY", "ACCOUNTANT"), validate(uuidParam), feeStructureController.getFeeStructure)
  .put(authorize("ACCOUNTANT"), validate(updateFeeStructureSchema), feeStructureController.updateFeeStructure)
  .delete(authorize("ACCOUNTANT"), validate(uuidParam), feeStructureController.deleteFeeStructure);

module.exports = router;
