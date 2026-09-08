import { WelcomeBanner } from "./_components/welcome-banner";
import { StatCardGrid } from "./_components/stat-card-grid";
import { GenderDistributionChart } from "./_components/gender-distribution-chart";
import { OfficeStationChart } from "./_components/office-station-chart";
import { DepartmentUnitCount } from "./_components/department-unit-count";
import { LevelGradeChart } from "./_components/level-grade-chart";
import { EmployeeStatusTable } from "./_components/employee-status-table";

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-12">
      {/* 1. Green Welcome Banner */}
      <WelcomeBanner />

      {/* 2. Top Row: Metrics Overview */}
      <StatCardGrid />

      {/* 3. Middle Row: Left Column (Gender Distribution + Office Station) & Right Column (Department Count) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-6">
          <GenderDistributionChart />
          <OfficeStationChart />
        </div>
        <div className="lg:col-span-7">
          <DepartmentUnitCount />
        </div>
      </div>

      {/* 4. Lower Row 1: Level/Grade Chart */}
      <LevelGradeChart />

      {/* 5. Lower Row 2: Status Table */}
      <EmployeeStatusTable />
    </div>
  );
}