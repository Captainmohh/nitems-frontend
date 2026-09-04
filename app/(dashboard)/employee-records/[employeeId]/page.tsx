import { ProfileHeader } from "./_components/profile-header";
import { PersonalInformation } from "./_components/personal-information";
import { WorkInformation } from "./_components/work-information";
import { FinancialInformation } from "./_components/financial-information";
import { PerformanceInformation } from "./_components/performance-information";
import { EmergencyContact } from "./_components/emergency-contact";
import { OtherInformation } from "./_components/other-information";

export default async function EmployeeProfilePage(
  props: PageProps<"/employee-records/[employeeId]">,
) {
  const { employeeId } = await props.params;

  return (
    <div>
      <h1>Employee {employeeId}</h1>
      <ProfileHeader />
      <PersonalInformation />
      <WorkInformation />
      <FinancialInformation />
      <PerformanceInformation />
      <EmergencyContact />
      <OtherInformation />
    </div>
  );
}
