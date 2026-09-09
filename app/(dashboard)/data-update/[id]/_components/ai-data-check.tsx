"use client";

import { useState } from "react";
import { AlertTriangle, ChevronDown, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const mockIssues = [
  {
    title: "Date of Birth Mismatch",
    details: [
      { label: "Entered", value: "27 April 2026" },
      { label: "On Document", value: "27 April 1994" },
    ],
  },
  {
    title: "Degree Certificate Name Mismatch",
    details: [
      {
        label: "",
        value: 'Name on certificate does not match "Mukhtar Mohammad Adepoju"',
      },
    ],
  },
];

const mockPassedChecks = [
  "Phone number format valid",
  "Email format valid",
  "State of origin matches record",
  "Passport photograph uploaded",
  "Address format valid",
];

export function AiDataCheck() {
  const [showPassed, setShowPassed] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
        <Image src="/Brain.png" alt="AI Data Check" width={40} height={40} />
        <h3 className="font-semibold text-gray-900">AI Data Check</h3>
      </div>

      <div className="flex items-center gap-2 mt-4 mb-3">
        <span className="font-semibold text-red-500">
          {mockIssues.length} Issues found
        </span>
        <AlertTriangle className="w-4 h-4 text-yellow-500" />
      </div>

      <div className="space-y-3">
        {mockIssues.map((issue) => (
          <div
            key={issue.title}
            className="bg-orange-50 border border-orange-100 rounded-lg p-4"
          >
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-2">
                  {issue.title}
                </p>
                {issue.details.map((detail, i) => (
                  <p key={i} className="text-sm text-gray-600">
                    {detail.label && (
                      <span className="text-gray-500">{detail.label}: </span>
                    )}
                    {detail.value}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 mt-4 pt-4">
        <button
          onClick={() => setShowPassed(!showPassed)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary-green fill-primary-green" />
            <span className="font-semibold text-primary-green text-sm">
              All other checks passed ({mockPassedChecks.length})
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform ${
              showPassed ? "rotate-180" : ""
            }`}
          />
        </button>
        <p className="text-xs text-gray-400 mt-1 ml-7">Click to view details</p>

        {showPassed && (
          <ul className="mt-3 ml-7 space-y-1.5">
            {mockPassedChecks.map((check) => (
              <li key={check} className="text-sm text-gray-600 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-gray-400" />
                {check}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}