import { RefreshCw } from "lucide-react";
import { ProfileSummary } from "./_components/profile-summary";
import {
  PersonalInfoSection,
  DepartmentAssignmentSection,
} from "./_components/personal-info-section";
import {
  NextOfKinSection,
  UploadedDocumentsSection,
} from "./_components/next-of-kin-and-documents";
import { AiDataCheck } from "./_components/ai-data-check";


export default async function DataUpdateReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <RefreshCw className="w-7 h-7 text-accent-green" />
        <h1 className="text-2xl font-semibold text-accent-green">
          Data Update Review
        </h1>
      </div>

      <ProfileSummary staffId={id} />

    <div className="grid grid-cols-2 gap-6 items-start">
        <div className="space-y-6">
            <PersonalInfoSection />
            <NextOfKinSection />
            <UploadedDocumentsSection />
            <AiDataCheck />
        </div>
    <div className="space-y-6">
        <DepartmentAssignmentSection />
    </div>
</div>
</div>
  );
}