const facultyService = require("../services/faculty.service");
const asyncHandler = require("../utils/asyncHandler");

const listFaculty = asyncHandler(async (req, res) => {
  const data = await facultyService.listFaculty(req.validated.query);
  res.json({ success: true, ...data });
});

const getFaculty = asyncHandler(async (req, res) => {
  const faculty = await facultyService.getFacultyById(req.params.id);
  res.json({ success: true, data: faculty });
});

const createFaculty = asyncHandler(async (req, res) => {
  const faculty = await facultyService.createFaculty(req.validated.body);
  res.status(201).json({ success: true, data: faculty });
});

const updateFaculty = asyncHandler(async (req, res) => {
  const faculty = await facultyService.updateFaculty(req.params.id, req.validated.body);
  res.json({ success: true, data: faculty });
});

const deleteFaculty = asyncHandler(async (req, res) => {
  await facultyService.deleteFaculty(req.params.id);
  res.status(204).send();
});

module.exports = {
  listFaculty,
  getFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty,
};
