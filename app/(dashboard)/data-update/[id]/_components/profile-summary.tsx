import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface ProfileSummaryProps {
  staffId: string;
}

const mockProfile = {
  name: "Mukhtar Mohammad Adepoju",
  staffId: "NITDA/HQ/441/P",
  status: "pending" as const,
  photoUrl: "/Rectangle 34624124.png",
  department: "Information Technology Department",
  title: "Officer I",
  level: 8,
  step: 3,
  submissionDate: "24 April 2026",
  lastUpdated: "26 April 2026",
};

export function ProfileSummary({ staffId }: ProfileSummaryProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 flex gap-6">
      <div className="flex flex-col gap-3 shrink-0">
        <Image
          src={mockProfile.photoUrl}
          alt={mockProfile.name}
          width={96}
          height={96}
          className="w-24 h-24 rounded-lg object-cover border-2 border-primary-green"
        />
        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg w-25 py-2">
          <span className="text-xs text-gray-400">Level</span>
          <div className="relative">
            <span className="text-3xl font-bold text-accent-green leading-none">
              {mockProfile.level}
            </span>
            <div className="absolute -top-2 -right-4 flex flex-col items-center">
            <span className="text-xs font-bold text-red-500">
              {mockProfile.step}
            </span>
          </div>
          </div>
          <span className="text-[9px] text-gray-400 leading-tight whitespace-nowrap">Step</span>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-accent-green">
            {mockProfile.name}
          </h2>
          <Badge variant={mockProfile.status}>
            {mockProfile.status.charAt(0).toUpperCase() +
              mockProfile.status.slice(1)}
          </Badge>
        </div>
        <p className="text-sm text-gray-400 mb-4">{mockProfile.staffId}</p>

        <div className="border border-gray-100 rounded-lg p-4 grid grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <p className="text-xs text-gray-400 mb-1">Department</p>
            <p className="text-sm font-semibold text-gray-900">
              {mockProfile.department}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Title</p>
            <p className="text-sm font-semibold text-gray-900">
              {mockProfile.title}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Submission</p>
            <p className="text-sm font-semibold text-gray-900">
              {mockProfile.submissionDate}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Last Updated</p>
            <p className="text-sm font-semibold text-gray-900">
              {mockProfile.lastUpdated}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}