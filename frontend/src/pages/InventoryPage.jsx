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
        sort,
    ]);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, category, sort]);

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