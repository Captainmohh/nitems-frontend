import { StatCardGrid } from "./_components/stat-card-grid";
import { GenderDistributionChart } from "./_components/gender-distribution-chart";
import { OfficeStationChart } from "./_components/office-station-chart";
import { DepartmentUnitCount } from "./_components/department-unit-count";
import { LevelGradeChart } from "./_components/level-grade-chart";
import { EmployeeStatusTable } from "./_components/employee-status-table";

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-12">
      {/* Top Row: Metrics Overview */}
      <StatCardGrid />

      {/* Middle Row: Charts & Department Count */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GenderDistributionChart />
        <OfficeStationChart />
        <DepartmentUnitCount />
      </div>

      {/* Lower Row 1: Full-width Level/Grade Distribution Chart */}
      <LevelGradeChart />

      {/* Lower Row 2: Status Table (Pending / Active) */}
      <EmployeeStatusTable />
    </div>
  );
}