"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { INITIAL_EMPLOYEES } from "@/lib/data/employees";

export default function EmployeeRecordsPage() {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close popup menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalEntries = INITIAL_EMPLOYEES.length;

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header Banner */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 flex items-center gap-3 shadow-xs">
        <div className="w-8 h-8 flex items-center justify-center shrink-0">
          <Image
            src="/icons/employee-records.png"
            alt="Employee Records"
            width={30}
            height={30}
            className="object-contain"
          />
        </div>
        <h1 className="text-xl font-bold text-[#16A34A] tracking-tight">
          Employee Records
        </h1>
      </div>

      {/* Directory Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto min-h-[380px]">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 text-xs font-semibold text-gray-700 bg-white">
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6">Staff ID</th>
                <th className="py-4 px-6">Department</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs">
              {INITIAL_EMPLOYEES.map((emp) => (
                <tr
                  key={emp.id}
                  className="hover:bg-gray-50/70 transition-colors"
                >
                  {/* Name + Initials Badge */}
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded flex items-center justify-center text-white font-bold text-xs shrink-0 ${emp.avatarBg}`}
                      >
                        {emp.avatarChar}
                      </div>
                      <span className="font-semibold text-gray-900 whitespace-nowrap">
                        {emp.name}
                      </span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="py-3.5 px-6 text-gray-600 whitespace-nowrap">
                    {emp.email}
                  </td>

                  {/* Staff ID */}
                  <td className="py-3.5 px-6 text-gray-600 whitespace-nowrap">
                    {emp.staffId}
                  </td>

                  {/* Department */}
                  <td className="py-3.5 px-6 text-gray-600 whitespace-nowrap">
                    {emp.department}
                  </td>

                  {/* Status Pill Badge */}
                  <td className="py-3.5 px-6 whitespace-nowrap">
                    <span
                      className={`inline-block px-3.5 py-1 text-[11px] font-medium rounded-full ${
                        emp.status === "Active"
                          ? "bg-[#22C55E] text-white"
                          : emp.status === "Pending"
                          ? "bg-[#F97316] text-white"
                          : "bg-[#EA580C] text-white"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>

                  {/* Action Dropdown Menu */}
                  <td className="py-3.5 px-6 text-right relative whitespace-nowrap">
                    <button
                      type="button"
                      aria-label="Actions"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdownId(
                          openDropdownId === emp.id ? null : emp.id
                        );
                      }}
                      className="p-1 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {openDropdownId === emp.id && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-6 top-10 w-36 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-30 text-left animate-in fade-in zoom-in-95 duration-100"
                      >
                        <Link
                          href={`/employee-records/${emp.id}`}
                          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setOpenDropdownId(null)}
                        >
                          <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                          View Profile
                        </Link>
                        <button
                          type="button"
                          onClick={() => setOpenDropdownId(null)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-100 text-xs text-gray-500">
          <span>Showing 1 to {totalEntries} of 12 entries</span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="p-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-30"
              disabled
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="p-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-30"
              disabled
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {[1, 2, 3, 4, 5].map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`w-7 h-7 rounded text-xs font-semibold flex items-center justify-center transition-colors ${
                  currentPage === pageNum
                    ? "bg-[#3B82F6] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              type="button"
              className="p-1.5 text-gray-400 hover:text-gray-700"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="p-1.5 text-gray-400 hover:text-gray-700"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}