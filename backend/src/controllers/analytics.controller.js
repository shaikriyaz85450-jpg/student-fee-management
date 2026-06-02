const analyticsService = require("../services/analytics.service");
const asyncHandler = require("../utils/asyncHandler");

const dashboardOverview = asyncHandler(async (_req, res) => {
  const data = await analyticsService.getDashboardOverview();
  res.json({ success: true, data });
});

const collectionAnalytics = asyncHandler(async (req, res) => {
  const data = await analyticsService.getCollectionAnalytics(req.validated.query);
  res.json({ success: true, data });
});

const pendingFeeAnalytics = asyncHandler(async (req, res) => {
  const data = await analyticsService.getPendingFeeAnalytics(req.validated.query);
  res.json({ success: true, data });
});

const studentPaymentAnalytics = asyncHandler(async (req, res) => {
  const data = await analyticsService.getStudentPaymentAnalytics(req.params.id, req.user);
  res.json({ success: true, data });
});

module.exports = {
  dashboardOverview,
  collectionAnalytics,
  pendingFeeAnalytics,
  studentPaymentAnalytics,
};
