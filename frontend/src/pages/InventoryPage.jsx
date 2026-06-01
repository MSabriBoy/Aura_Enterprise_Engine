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

  const debouncedSearch =
    useDebounce(search);

  useEffect(() => {
    const loadInventory =
      async () => {
        const data =
          await fetchInventory({
            page,
            limit: 10,
            search:
              debouncedSearch,
            category,
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
  ]);

  useEffect(() => {
  setPage(1);
}, [debouncedSearch, category]);

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Inventory
      </h1>

      <div className="mb-6 flex gap-4">
        <SearchBar
          value={search}
          onChange={setSearch}
        />

        <CategoryFilter
          value={category}
          onChange={setCategory}
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