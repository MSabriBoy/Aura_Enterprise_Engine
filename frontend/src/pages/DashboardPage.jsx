import {
    useEffect,
    useState,
} from "react";

import { fetchAnalytics }
    from "../services/analyticsService";

import KpiCard
    from "../components/KpiCard";

import LowStockChart from "../components/LowStockChart";
import CategoryValuationChart from "../components/CategoryValuationChart";

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
    console.log(
  analytics.lowStockProducts
);

    return (
        <div className="p-6">

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <LowStockChart
                    data={
                        analytics.lowStockProducts
                    }
                />

                <CategoryValuationChart
                    data={
                        analytics.categoryValuation
                    }
                />
            </div>

        </div>
    );
}

export default DashboardPage;