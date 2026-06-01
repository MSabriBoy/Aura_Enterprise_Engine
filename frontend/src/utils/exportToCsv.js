const escapeCsvValue = (value) => {
  if (value === null || value === undefined) {
    return "";
  }

  const stringValue = String(value);

  if (
    stringValue.includes(",") ||
    stringValue.includes('"') ||
    stringValue.includes("\n")
  ) {
    return `"${stringValue.replaceAll('"', '""')}"`;
  }

  return stringValue;
};

export const exportToCsv = ({
  filename,
  columns,
  rows,
}) => {
  const header = columns.join(",");

  const body = rows
    .map((row) =>
      row
        .map(escapeCsvValue)
        .join(",")
    )
    .join("\n");

  const csvContent =
    `${header}\n${body}`;

  const blob = new Blob(
    [csvContent],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  const url =
    URL.createObjectURL(blob);

  const anchor =
    document.createElement("a");

  anchor.href = url;
  anchor.download = filename;

  document.body.appendChild(anchor);

  anchor.click();

  document.body.removeChild(anchor);

  URL.revokeObjectURL(url);
};