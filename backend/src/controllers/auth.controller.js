const authService = require("../services/auth.service");
const asyncHandler = require("../utils/asyncHandler");

const login = asyncHandler(async (req, res) => {
  const data = await authService.login({
    ...req.validated.body,
    ipAddress: req.ip,
    userAgent: req.get("user-agent"),
  });
  res.json({ success: true, data });
});

const registerUser = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.validated.body);
  res.status(201).json({ success: true, data: user });
});

const me = asyncHandler(async (req, res) => {
  res.json({ success: true, data: req.user });
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await authService.updateProfile(req.user.id, req.user.role, req.body);
  res.json({ success: true, data: user });
});

module.exports = {
  login,
  registerUser,
  me,
  updateProfile,
};
