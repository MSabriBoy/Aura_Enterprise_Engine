const Joi = require("joi");

const productSchema = Joi.object({
  productName: Joi.string().trim().required(),

  sku: Joi.string().trim().required(),

  category: Joi.string().trim().required(),

  price: Joi.number().min(0).required(),

  cost: Joi.number().min(0).required(),

  stockQuantity: Joi.number().min(0).required(),

  reorderLevel: Joi.number().min(0).required(),
}).custom((value, helpers) => {
  if (value.price < value.cost) {
    return helpers.error("any.invalid");
  }

  return value;
}, "Business Validation");

module.exports = productSchema;