function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="mt-6 flex items-center gap-4">
      <button
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(
            currentPage - 1
          )
        }
        className="rounded border px-4 py-2 disabled:opacity-50"
      >
        Previous
      </button>

      <span>
        Page {currentPage} of{" "}
        {totalPages}
      </span>

      <button
        disabled={
          currentPage === totalPages
        }
        onClick={() =>
          onPageChange(
            currentPage + 1
          )
        }
        className="rounded border px-4 py-2 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;