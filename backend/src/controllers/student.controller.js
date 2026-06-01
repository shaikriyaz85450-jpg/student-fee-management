const studentService = require("../services/student.service");
const asyncHandler = require("../utils/asyncHandler");

const listStudents = asyncHandler(async (req, res) => {
  const data = await studentService.listStudents(req.validated.query);
  res.json({ success: true, ...data });
});

const getStudent = asyncHandler(async (req, res) => {
  const student =
    req.user.role === "STUDENT"
      ? await studentService.getStudentByUserId(req.user.id)
      : await studentService.getStudentById(req.params.id);

  res.json({ success: true, data: student });
});

const createStudent = asyncHandler(async (req, res) => {
  const student = await studentService.createStudent(req.validated.body);
  res.status(201).json({ success: true, data: student });
});

const updateStudent = asyncHandler(async (req, res) => {
  const student = await studentService.updateStudent(req.params.id, req.validated.body);
  res.json({ success: true, data: student });
});

const deleteStudent = asyncHandler(async (req, res) => {
  await studentService.deleteStudent(req.params.id);
  res.status(204).send();
});

module.exports = {
  listStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
