"use client";

import { useState } from "react";
import { MoreVertical, ChevronDown, ChevronUp } from "lucide-react";

type TabType = "pending" | "active";

type EmployeeRow = {
  id: string;
  name: string;
  code: string;
  email: string;
  dueDate: string;
  status: "Pending" | "Active";
  avatarBg: string;
  avatarChar: string;
};

const EMPLOYEES: Record<TabType, EmployeeRow[]> = {
  pending: [
    {
      id: "1",
      name: "Yusuf Mustapha",
      code: "#5632",
      email: "myusuf@nitda.gov.ng",
      dueDate: "27 Mar 2026",
      status: "Pending",
      avatarBg: "bg-[#EA580C]",
      avatarChar: "Y",
    },
    {
      id: "2",
      name: "Maryam Lala",
      code: "#5632",
      email: "mshuaibu@nitda.gov.ng",
      dueDate: "27 Mar 2026",
      status: "Pending",
      avatarBg: "bg-[#16A34A]",
      avatarChar: "M",
    },
    {
      id: "3",
      name: "Mukthar Adepoju",
      code: "#5632",
      email: "madepoju@nitda.gov.ng",
      dueDate: "27 Mar 2026",
      status: "Pending",
      avatarBg: "bg-[#16A34A]",
      avatarChar: "M",
    },
    {
      id: "4",
      name: "Usman Abubakar",
      code: "#5632",
      email: "uabubakar@nitda.gov.ng",
      dueDate: "27 Mar 2026",
      status: "Pending",
      avatarBg: "bg-[#4F46E5]",
      avatarChar: "U",
    },
    {
      id: "5",
      name: "Maryam Magama",
      code: "#5632",
      email: "mmagama@nitda.gov.ng",
      dueDate: "27 Mar 2026",
      status: "Pending",
      avatarBg: "bg-[#16A34A]",
      avatarChar: "M",
    },
  ],
  active: [
    {
      id: "6",
      name: "Ibrahim Sani",
      code: "#1023",
      email: "isani@nitda.gov.ng",
      dueDate: "15 Jan 2026",
      status: "Active",
      avatarBg: "bg-[#0B4A2D]",
      avatarChar: "I",
    },
    {
      id: "7",
      name: "Fatima Aliyu",
      code: "#1024",
      email: "faliyu@nitda.gov.ng",
      dueDate: "02 Feb 2026",
      status: "Active",
      avatarBg: "bg-[#2563EB]",
      avatarChar: "F",
    },
  ],
};

export function EmployeeStatusTable() {
  const [activeTab, setActiveTab] = useState<TabType>("pending");
  const [isExpanded, setIsExpanded] = useState(false);

  // When "View All" is toggled, combine both lists; otherwise show the active tab
  const displayedRows = isExpanded
    ? [...EMPLOYEES.pending, ...EMPLOYEES.active]
    : EMPLOYEES[activeTab];

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs w-full">
      {/* Tabs & View All Toggle */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <div className="flex gap-6">
          <button
            type="button"
            onClick={() => {
              setActiveTab("pending");
              setIsExpanded(false);
            }}
            className={`text-xs font-semibold pb-2.5 relative transition-colors ${
              !isExpanded && activeTab === "pending"
                ? "text-[#2563EB] font-bold"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Pending
            {!isExpanded && activeTab === "pending" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2563EB] rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("active");
              setIsExpanded(false);
            }}
            className={`text-xs font-semibold pb-2.5 relative transition-colors ${
              !isExpanded && activeTab === "active"
                ? "text-[#2563EB] font-bold"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Active
            {!isExpanded && activeTab === "active" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2563EB] rounded-full" />
            )}
          </button>
        </div>

        {/* View All / Collapse Toggle Button */}
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex items-center gap-1 text-xs font-medium text-[#2563EB] hover:text-blue-700 transition-colors"
        >
          {isExpanded ? (
            <>
              Show Less
              <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              View All
              <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto mt-2">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 font-semibold text-xs border-b border-gray-100">
              <th className="py-3 px-2 font-medium">Name</th>
              <th className="py-3 px-2 font-medium">Email</th>
              <th className="py-3 px-2 font-medium">Due Date</th>
              <th className="py-3 px-2 font-medium">Status</th>
              <th className="py-3 px-2 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-xs">
            {displayedRows.map((emp) => (
              <tr
                key={emp.id}
                className="hover:bg-gray-50/70 transition-colors group"
              >
                {/* Name + Badge */}
                <td className="py-3 px-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded flex items-center justify-center text-white font-bold text-xs ${emp.avatarBg}`}
                    >
                      {emp.avatarChar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {emp.name}
                      </div>
                      <div className="text-[11px] text-gray-400">
                        {emp.code}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="py-3 px-2 text-gray-600">{emp.email}</td>

                {/* Due Date */}
                <td className="py-3 px-2 text-gray-600">{emp.dueDate}</td>

                {/* Status Badge */}
                <td className="py-3 px-2">
                  <span
                    className={`inline-block px-3 py-1 text-[11px] font-medium rounded-full ${
                      emp.status === "Pending"
                        ? "bg-[#F97316] text-white"
                        : "bg-[#16A34A] text-white"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>

                {/* Action Menu */}
                <td className="py-3 px-2 text-right">
                  <button
                    type="button"
                    aria-label="Actions"
                    className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}