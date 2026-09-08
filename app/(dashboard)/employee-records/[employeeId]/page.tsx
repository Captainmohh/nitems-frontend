import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { INITIAL_EMPLOYEES } from "@/lib/data/employees";

import { ProfileHeader } from "./_components/profile-header";
import { PersonalInformation } from "./_components/personal-information";
import { WorkInformation } from "./_components/work-information";
import { FinancialInformation } from "./_components/financial-information";
import { PerformanceInformation } from "./_components/performance-information";
import { EmergencyContact } from "./_components/emergency-contact";
import { OtherInformation } from "./_components/other-information";

export default async function EmployeeProfilePage(
  props: PageProps<"/employee-records/[employeeId]">
) {
  const { employeeId } = await props.params;

  // Match by id or staffId fallback
  const employee =
    INITIAL_EMPLOYEES.find(
      (e) => e.id === employeeId || encodeURIComponent(e.staffId) === employeeId
    ) || INITIAL_EMPLOYEES[0];

  return (
    <div className="space-y-6 pb-16">
      <div>
        <Link
          href="/employee-records"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Employee Records
        </Link>
      </div>

      <ProfileHeader employee={employee} />
      <PersonalInformation employee={employee} />
      <WorkInformation employee={employee} />
      <FinancialInformation employee={employee} />
      <PerformanceInformation employee={employee} />
      <EmergencyContact employee={employee} />
      <OtherInformation employee={employee} />
    </div>
  );
}