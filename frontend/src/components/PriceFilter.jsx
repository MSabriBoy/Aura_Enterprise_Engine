function PriceFilter({
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
        All Prices
      </option>

      <option value="0-100">
        $0 - $100
      </option>

      <option value="100-300">
        $100 - $300
      </option>

      <option value="300-500">
        $300 - $500
      </option>

      <option value="500+">
        $500+
      </option>
    </select>
  );
}

export default PriceFilter;