import { OnboardingRequestTable } from "./_components/onboarding-request-table";
import { InitiateOnboardingDialog } from "./_components/initiate-onboarding-dialog";

export default function OnboardingPage() {
  return (
    <div>
      <h1>Onboarding</h1>
      <InitiateOnboardingDialog />
      <OnboardingRequestTable />
    </div>
  );
}
