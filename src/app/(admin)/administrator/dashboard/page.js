import StatsCards from "@/components/admin/dashboard/StatsCards";
import OverviewChart from "@/components/admin/dashboard/OverviewChart";
import RecentOrders from "@/components/admin/dashboard/RecentOrders";
import QuickActions from "@/components/admin/dashboard/QuickActions";

export default function DashboardPage() {
  return (
    <div>

      <StatsCards />

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-2">
          <OverviewChart />
        </div>

        <RecentOrders />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-2xl p-6 border">
          Templates Section
        </div>

        <QuickActions />
      </div>

    </div>
  );
}