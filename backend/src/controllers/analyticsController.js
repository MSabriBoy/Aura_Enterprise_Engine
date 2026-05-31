const analyticsService = require(
  "../services/analyticsService"
);

const asyncHandler = require(
  "../utils/asyncHandler"
);

const getAnalytics = asyncHandler(
  async (req, res) => {
    const analytics =
      await analyticsService.getAnalytics();

    res.status(200).json(analytics);
  }
);

module.exports = {
  getAnalytics,
};