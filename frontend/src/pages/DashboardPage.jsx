import {
  useEffect,
  useState,
} from "react";

import { fetchAnalytics }
from "../services/analyticsService";

import KpiCard
from "../components/KpiCard";

function DashboardPage() {
  const [analytics,
    setAnalytics] = useState(null);

  useEffect(() => {
    const loadDashboard =
      async () => {
        const data =
          await fetchAnalytics();

        setAnalytics(data);
      };

    loadDashboard();
  }, []);

  if (!analytics) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Aura Enterprise Engine
      </h1>

      <div className="grid grid-cols-3 gap-4">
        <KpiCard
          title="Total SKUs"
          value={
            analytics.summary
              .totalSkus
          }
        />

        <KpiCard
          title="Inventory Value"
          value={`$${Math.round(
            analytics.summary
              .totalInventoryValue
          ).toLocaleString()}`}
        />

        <KpiCard
          title="Out Of Stock"
          value={
            analytics.summary
              .outOfStockCount
          }
        />
      </div>
    </div>
  );
}

export default DashboardPage;