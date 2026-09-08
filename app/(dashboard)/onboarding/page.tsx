"use client";

import { useState } from "react";
import Image from "next/image";
import { OnboardingRequestTable } from "./_components/onboarding-request-table";
import { InitiateOnboardingDialog } from "./_components/initiate-onboarding-dialog";

export default function OnboardingPage() {
  const [activeTab, setActiveTab] = useState<"pending" | "active">("pending");
  const [isInitiateDialogOpen, setIsInitiateDialogOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Image src="/rocket.png" alt="Onboarding" width={32} height={32} />
          <h1 className="text-2xl font-semibold text-primary-green">
            Onboarding
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
          onClick={() => setIsInitiateDialogOpen(true)}
          className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
          Initiate Onboarding &gt;&gt;&gt;
          </button>

          <button className="px-5 py-2.5 rounded-lg bg-primary-green text-white text-sm font-medium hover:bg-primary-green/90 transition-colors">
            Onboard New User &gt;&gt;&gt;
          </button>
        </div>
      </div>

      {/* Tabs row */}
      <div className="flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab("pending")}
            className={`pb-3 text-base font-medium border-b-2 transition-colors ${
              activeTab === "pending"
                ? "border-blue-400 text-blue-400"
                : "border-transparent text-black"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setActiveTab("active")}
            className={`pb-3 text-base font-medium border-b-2 transition-colors ${
              activeTab === "active"
                ? "border-blue-400 text-blue-400"
                : "border-transparent text-black"
            }`}
          >
            Active
          </button>
        </div>

        <a href="#" className="text-base text-blue-400 font-light pb-3">
          View All &gt;
        </a>
      </div>

      <InitiateOnboardingDialog
      isOpen={isInitiateDialogOpen}
      onClose={() => setIsInitiateDialogOpen(false)}
/>
      <OnboardingRequestTable status={activeTab} />
    </div>
  );
}