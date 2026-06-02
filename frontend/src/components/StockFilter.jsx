function StockFilter({
  value,
  onChange,
}) {
  return (
    <select
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
      className="rounded-lg border px-4 py-2"
    >
      <option value="">
        All Stock
      </option>

      <option value="20">
        Below 20
      </option>

      <option value="50">
        Below 50
      </option>

      <option value="100">
        Below 100
      </option>
    </select>
  );
}

export default StockFilter;