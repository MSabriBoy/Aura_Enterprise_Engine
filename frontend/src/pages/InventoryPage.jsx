import {
    useEffect,
    useState,
} from "react";

import { fetchInventory }
    from "../services/inventoryService";

import SearchBar
    from "../components/SearchBar";

import CategoryFilter
    from "../components/CategoryFilter";

import InventoryTable
    from "../components/InventoryTable";

import Pagination
    from "../components/Pagination";

import useDebounce
    from "../hooks/useDebounce";

import ExportButton
    from "../components/ExportButton";

import { exportToCsv }
    from "../utils/exportToCsv";

import SortDropdown
    from "../components/SortDropdown";

import PriceFilter
from "../components/PriceFilter";    

import StockFilter
from "../components/StockFilter";

function InventoryPage() {
    const [products,
        setProducts] = useState([]);

    const [search,
        setSearch] = useState("");

    const [category,
        setCategory] = useState("");

    const [page,
        setPage] = useState(1);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
    });

    const [sort, setSort] = useState("");

    const [priceRange,
  setPriceRange] = useState("");

  const [stockLevel,
  setStockLevel] = useState("");

    const debouncedSearch =
        useDebounce(search);

    const handleExport = () => {
        exportToCsv({
            filename: "inventory-export.csv",

            columns: [
                "SKU",
                "Product",
                "Category",
                "Price",
                "Cost",
                "Stock",
                "Reorder Level",
            ],

            rows: products.map(
                (product) => [
                    product.sku,
                    product.productName,
                    product.category,
                    product.price,
                    product.cost,
                    product.stockQuantity,
                    product.reorderLevel,
                ]
            ),
        });
    };

    useEffect(() => {
        const loadInventory =
            async () => {
                const data =
                    await fetchInventory({
                        page,
                        limit: 10,
                        search: debouncedSearch,
                        category,
                        priceRange,
                        stockLevel,
                        sort,
                    });

                setProducts(
                    data.products
                );

                setPagination(data);
            };

        loadInventory();
    }, [
        page,
        category,
        debouncedSearch,
        priceRange,
        stockLevel,
        sort,
    ]);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, category, priceRange, stockLevel, sort,]);

    return (
        <div className="p-6">
            <div className="mb-6 flex gap-4">
                <SearchBar
                    value={search}
                    onChange={setSearch}
                />

                <CategoryFilter
                    value={category}
                    onChange={setCategory}
                />
                <PriceFilter
  value={priceRange}
  onChange={setPriceRange}
/>
<StockFilter
  value={stockLevel}
  onChange={setStockLevel}
/>
                <SortDropdown
                    value={sort}
                    onChange={setSort}
                />
                <ExportButton
                    onExport={handleExport}
                    disabled={!products.length}
                />

            </div>

            <InventoryTable
                products={products}
            />

            <Pagination
                currentPage={
                    pagination.currentPage
                }
                totalPages={
                    pagination.totalPages
                }
                onPageChange={setPage}
            />
        </div>
    );
}

export default InventoryPage;