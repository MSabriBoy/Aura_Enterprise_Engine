function SearchBar({
  value,
  onChange,
}) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
      className="w-full rounded-lg border px-4 py-2 outline-none"
    />
  );
}

export default SearchBar;