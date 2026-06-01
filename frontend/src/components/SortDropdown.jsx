function SortDropdown({
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
        Default
      </option>

      <option value="price">
        Price: Low to High
      </option>

      <option value="-price">
        Price: High to Low
      </option>
    </select>
  );
}

export default SortDropdown;