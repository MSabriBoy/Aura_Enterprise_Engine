const inventoryService = require(
  "../services/inventoryService"
);

const asyncHandler = require(
  "../utils/asyncHandler"
);

const getInventory = asyncHandler(
  async (req, res) => {
    const result =
      await inventoryService.fetchInventory(
        req.query
      );

    res.status(200).json(result);
  }
);

module.exports = {
  getInventory,
};