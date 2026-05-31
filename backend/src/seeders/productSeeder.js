require("dotenv").config();

const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

const connectDatabase = require("../config/db");
const Product = require("../models/Product");

const PRODUCT_TARGET = 50000;
const BATCH_SIZE = 1000;

const categories = [
  "Electronics",
  "Apparel",
  "Home",
  "Office",
  "Sports",
  "Automotive",
  "Health",
  "Beauty",
  "Books",
  "Toys",
];

const createProduct = (index) => {
  const cost = Number(
    faker.commerce.price({
      min: 10,
      max: 500,
      dec: 2,
    })
  );

  const price = Number(
    (cost + faker.number.float({
      min: 5,
      max: 200,
      fractionDigits: 2,
    })).toFixed(2)
  );

  return {
    productName: faker.commerce.productName(),

    sku: `SKU-${String(index).padStart(6, "0")}`,

    category:
      categories[
        faker.number.int({
          min: 0,
          max: categories.length - 1,
        })
      ],

    cost,

    price,

    stockQuantity: faker.number.int({
      min: 0,
      max: 1000,
    }),

    reorderLevel: faker.number.int({
      min: 5,
      max: 100,
    }),

    lastUpdated: faker.date.recent({
      days: 60,
    }),
  };
};

const seedProducts = async () => {
  try {
    await connectDatabase();

    console.log("Cleaning existing inventory...");

    await Product.deleteMany({});

    let insertedCount = 0;

    while (insertedCount < PRODUCT_TARGET) {
      const batch = [];

      const batchLimit = Math.min(
        insertedCount + BATCH_SIZE,
        PRODUCT_TARGET
      );

      for (
        let index = insertedCount;
        index < batchLimit;
        index++
      ) {
        batch.push(createProduct(index + 1));
      }

      await Product.insertMany(batch);

      insertedCount += batch.length;

      console.log(
        `Inserted ${insertedCount}/${PRODUCT_TARGET}`
      );
    }

    console.log(
      `Inventory seeding completed (${PRODUCT_TARGET} records)`
    );

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();