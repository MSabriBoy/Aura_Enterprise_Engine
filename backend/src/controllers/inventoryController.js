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

const createProduct = asyncHandler(
    async (req, res) => {
        const product =
            await inventoryService.createProduct(
                req.body
            );

        res.status(201).json(product);
    }
);

const updateProduct = asyncHandler(
    async (req, res) => {
        const product =
            await inventoryService.updateProduct(
                req.params.id,
                req.body
            );

        res.status(200).json(product);
    }
);

module.exports = {
    getInventory,
    createProduct,
    updateProduct,
};