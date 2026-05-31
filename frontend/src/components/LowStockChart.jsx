import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function LowStockChart({
  data,
}) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">
        Low Stock Products
      </h2>

      <div className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="sku"
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="stockQuantity"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default LowStockChart;