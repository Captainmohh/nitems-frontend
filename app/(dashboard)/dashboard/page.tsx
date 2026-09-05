import { StatCardGrid } from "./_components/stat-card-grid";
import { GenderDistributionChart } from "./_components/gender-distribution-chart";
import { OfficeStationChart } from "./_components/office-station-chart";
import { DepartmentUnitCount } from "./_components/department-unit-count";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6 bg-[#F8F9FA] min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#0B4D3C] text-white p-6 rounded-2xl flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-xs text-emerald-100 mt-1">
            Welcome back, Admin — here&apos;s what&apos;s happening today
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-emerald-200">Hello Admin</span>
          <p className="text-xs text-white font-medium">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <StatCardGrid />

      {/* Middle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-6">
          <GenderDistributionChart />
          <OfficeStationChart />
        </div>
        <div className="lg:col-span-7">
          <DepartmentUnitCount />
        </div>
      </div>
    </div>
  );
}