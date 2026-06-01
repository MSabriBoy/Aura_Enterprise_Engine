const express = require("express");

const {
    getInventory,
    createProduct,
    updateProduct,
} = require(
    "../controllers/inventoryController"
);

const validateRequest = require(
    "../middleware/validateRequest"
);

const productSchema = require(
    "../validators/productValidator"
);
const router = express.Router();

router.get("/", getInventory);

router.post(
    "/",
    validateRequest(productSchema),
    createProduct
);

router.put(
    "/:id",
    validateRequest(productSchema),
    updateProduct
);

module.exports = router;