const Product = require("../models/Product");

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 50;

const buildSearchFilter = ({
    search,
    category,
}) => {
    const filters = {};

    if (search) {
        filters.productName = {
            $regex: search,
            $options: "i",
        };
    }

    if (category) {
        filters.category = category;
    }

    return filters;
};

const buildSortOptions = (sort) => {
    if (!sort) {
        return { lastUpdated: -1 };
    }

    const direction = sort.startsWith("-")
        ? -1
        : 1;

    const field = sort.replace("-", "");

    return {
        [field]: direction,
    };
};

const fetchInventory = async (query) => {
    const page =
        Number(query.page) || DEFAULT_PAGE;

    const limit =
        Number(query.limit) || DEFAULT_LIMIT;

    const skip = (page - 1) * limit;

    const filters = buildSearchFilter({
        search: query.search,
        category: query.category,
    });

    const sortOptions = buildSortOptions(
        query.sort
    );

    const [products, totalRecords] =
        await Promise.all([
            Product.find(filters)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit)
                .lean(),

            Product.countDocuments(filters),
        ]);

    return {
        products,
        totalRecords,

        totalPages: Math.ceil(
            totalRecords / limit
        ),

        currentPage: page,

        hasNextPage:
            page * limit < totalRecords,
    };
};

const createProduct = async (payload) => {
    return Product.create(payload);
};

const updateProduct = async (
    productId,
    payload
) => {
    return Product.findByIdAndUpdate(
        productId,
        payload,
        {
            new: true,
            runValidators: true,
        }
    );
};

module.exports = {
    fetchInventory,
    createProduct,
    updateProduct,
};