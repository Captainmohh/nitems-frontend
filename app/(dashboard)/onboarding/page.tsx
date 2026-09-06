import Image from "next/image";
import { OnboardingRequestTable } from "./_components/onboarding-request-table";
import { InitiateOnboardingDialog } from "./_components/initiate-onboarding-dialog";

export default function OnboardingPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <Image src="/rocket.png" alt=" Onboarding" width={32} height={32} />
          <h1 className="text-2xl font-semibold text-primary-green">
            Onboarding
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
            Initiate Onboarding &gt;&gt;&gt;
          </button>
          <button className="px-5 py-2.5 rounded-lg bg-primary-green text-white text-sm font-medium hover:bg-primary-green/90 transition-colors">
            Onboard New User &gt;&gt;&gt;
          </button>
        </div>
      </div>

      <InitiateOnboardingDialog />
      <OnboardingRequestTable />
    </div>
  );
}