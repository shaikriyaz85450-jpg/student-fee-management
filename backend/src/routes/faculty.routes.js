const router = require("express").Router();
const facultyController = require("../controllers/faculty.controller");
const validate = require("../middleware/validate.middleware");
const { authenticate, authorize } = require("../middleware/auth.middleware");
const { uuidParam } = require("../validations/common.validation");
const {
  createFacultySchema,
  updateFacultySchema,
  listFacultySchema,
} = require("../validations/faculty.validation");

router.use(authenticate);
router.use(authorize("ACCOUNTANT"));

router
  .route("/")
  .get(validate(listFacultySchema), facultyController.listFaculty)
  .post(validate(createFacultySchema), facultyController.createFaculty);

router
  .route("/:id")
  .get(validate(uuidParam), facultyController.getFaculty)
  .put(validate(updateFacultySchema), facultyController.updateFaculty)
  .delete(validate(uuidParam), facultyController.deleteFaculty);

module.exports = router;
