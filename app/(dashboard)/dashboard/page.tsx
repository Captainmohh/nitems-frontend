import { StatCardGrid } from "./_components/stat-card-grid";
import { GenderDistributionChart } from "./_components/gender-distribution-chart";
import { OfficeStationChart } from "./_components/office-station-chart";
import { DepartmentUnitCount } from "./_components/department-unit-count";
import { LevelGradeChart } from "./_components/level-grade-chart";
import { PendingActiveTable } from "./_components/pending-active-table";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <StatCardGrid />
      <GenderDistributionChart />
      <OfficeStationChart />
      <DepartmentUnitCount />
      <LevelGradeChart />
      <PendingActiveTable />
    </div>
  );
}
