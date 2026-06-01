const categories = [
  "",
  "Electronics",
  "Apparel",
  "Home",
  "Office",
  "Sports",
  "Automotive",
  "Health",
  "Beauty",
  "Books",
  "Toys",
];

function CategoryFilter({
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
      {categories.map(
        (category) => (
          <option
            key={category}
            value={category}
          >
            {category || "All Categories"}
          </option>
        )
      )}
    </select>
  );
}

export default CategoryFilter;