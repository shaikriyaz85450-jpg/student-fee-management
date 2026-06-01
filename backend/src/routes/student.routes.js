const router = require("express").Router();
const studentController = require("../controllers/student.controller");
const validate = require("../middleware/validate.middleware");
const { authenticate, authorize } = require("../middleware/auth.middleware");
const { uuidParam } = require("../validations/common.validation");
const {
  createStudentSchema,
  updateStudentSchema,
  listStudentsSchema,
} = require("../validations/student.validation");

router.use(authenticate);

router
  .route("/")
  .get(authorize("FACULTY", "ACCOUNTANT"), validate(listStudentsSchema), studentController.listStudents)
  .post(authorize("FACULTY", "ACCOUNTANT"), validate(createStudentSchema), studentController.createStudent);

router
  .route("/:id")
  .get(authorize("STUDENT", "FACULTY", "ACCOUNTANT"), validate(uuidParam), studentController.getStudent)
  .put(authorize("FACULTY", "ACCOUNTANT"), validate(updateStudentSchema), studentController.updateStudent)
  .delete(authorize("ACCOUNTANT"), validate(uuidParam), studentController.deleteStudent);

module.exports = router;
