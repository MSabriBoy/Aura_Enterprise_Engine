const Product = require("../models/Product");

const getAnalytics = async () => {
    const [
        summary,
        lowStockProducts,
        categoryValuation,
    ] = await Promise.all([
        Product.aggregate([
            {
                $group: {
                    _id: null,

                    totalInventoryValue: {
                        $sum: {
                            $multiply: [
                                "$price",
                                "$stockQuantity",
                            ],
                        },
                    },

                    totalSkus: {
                        $sum: 1,
                    },

                    outOfStockCount: {
                        $sum: {
                            $cond: [
                                {
                                    $eq: [
                                        "$stockQuantity",
                                        0,
                                    ],
                                },
                                1,
                                0,
                            ],
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    totalInventoryValue: 1,
                    totalSkus: 1,
                    outOfStockCount: 1,
                },
            },
        ]),

        Product.aggregate([
 {
  $match: {
    $expr: {
      $and: [
        {
          $gt: [
            "$stockQuantity",
            0
          ]
        },
        {
          $lt: [
            "$stockQuantity",
            "$reorderLevel"
          ]
        }
      ]
    }
  }
},

  {
    $sort: {
      stockQuantity: 1,
    },
  },

  {
    $limit: 10,
  },

  {
    $project: {
      productName: 1,
      sku: 1,
      stockQuantity: 1,
      reorderLevel: 1,
    },
  },
]),

        Product.aggregate([
            {
                $group: {
                    _id: "$category",

                    inventoryValue: {
                        $sum: {
                            $multiply: [
                                "$price",
                                "$stockQuantity",
                            ],
                        },
                    },
                },
            },

            {
                $sort: {
                    inventoryValue: -1,
                },
            },
        ]),
    ]);

    return {
        summary: summary[0] || {
            totalInventoryValue: 0,
            totalSkus: 0,
            outOfStockCount: 0,
        },

        lowStockProducts,

        categoryValuation,
    };
};

module.exports = {
    getAnalytics,
};