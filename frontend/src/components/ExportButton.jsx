function ExportButton({
  onExport,
  disabled,
}) {
  return (
    <button
      type="button"
      onClick={onExport}
      disabled={disabled}
      className="
        rounded-lg
        border
        px-4
        py-2
        font-medium
        transition
        hover:bg-gray-100
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      Export CSV
    </button>
  );
}

export default ExportButton;