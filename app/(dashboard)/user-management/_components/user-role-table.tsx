"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from "lucide-react";

type Role =
  | "Super Admin"
  | "Admin"
  | "Report Viewer"
  | "Active Directory Admin"
  | "Profile Approval"
  | "Staff";

type UserRow = {
  id: string;
  fullName: string;
  role: Role;
};

const ROLE_OPTIONS: Role[] = [
  "Super Admin",
  "Admin",
  "Report Viewer",
  "Active Directory Admin",
  "Profile Approval",
  "Staff",
];

const INITIAL_USERS: UserRow[] = [
  { id: "1", fullName: "Mukthar Adepoju", role: "Admin" },
  { id: "2", fullName: "Yusuf Mustapha", role: "Admin" },
  { id: "3", fullName: "Maryam Lala", role: "Profile Approval" },
  { id: "4", fullName: "Usman Badamasi", role: "Report Viewer" },
  { id: "5", fullName: "Tomiwa", role: "Staff" },
  { id: "6", fullName: "Abubakar", role: "Staff" },
  { id: "7", fullName: "Maryam Magama", role: "Staff" },
  { id: "8", fullName: "Ahmed Shehu", role: "Staff" },
];

export function UserRoleTable() {
  const [users, setUsers] = useState<UserRow[]>(INITIAL_USERS);
  const [openRowId, setOpenRowId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const dropdownRef = useRef<HTMLTableCellElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenRowId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleAssignRole(userId: string, role: Role) {
    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, role } : user))
    );
    setOpenRowId(null);
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs w-full">
      {/* Toolbar row */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Show</span>
          <select className="border border-gray-200 rounded-lg px-2 py-1 text-sm">
            <option value="10">10</option>
          </select>
        </div>

        <div className="relative w-full max-w-xs mx-4">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm w-full"
          />
        </div>

        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
          <option value="department">Department</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 font-semibold text-xs border-b border-gray-100">
              <th className="py-3 px-2 font-medium">
                <input type="checkbox" />
              </th>
              <th className="py-3 px-2 font-medium">S/N</th>
              <th className="py-3 px-2 font-medium">Full Name</th>
              <th className="py-3 px-2 font-medium">Role Permission</th>
              <th className="py-3 px-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-xs">
            {users.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-50/70 transition-colors">
                <td className="py-3 px-1">
                  <input type="checkbox" />
                </td>
                <td className="text-gray-950 py-4 px-1">
                  {String(index + 1).padStart(2, "0")}
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200" />
                    <span className="font-medium text-gray-900">
                      {user.fullName}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-2 text-gray-600">{user.role}</td>
                <td
                  className="py-3 px-2 relative"
                  ref={openRowId === user.id ? dropdownRef : undefined}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenRowId(openRowId === user.id ? null : user.id);
                    }}
                    className="flex items-center gap-1.5 border border-blue-600 text-blue-600 rounded-lg px-3 py-1.5 font-medium hover:bg-blue-50 transition-colors"
                  >
                    Assign role
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        openRowId === user.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openRowId === user.id && (
                    <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-30 text-left animate-in fade-in zoom-in-95 duration-100">
                      {ROLE_OPTIONS.map((role) => {
                        const isSelected = user.role === role;
                        return (
                          <button
                            key={role}
                            type="button"
                            onClick={() => handleAssignRole(user.id, role)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <span
                              className={`w-4 h-4 rounded-sm flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? "bg-green-600"
                                  : "border border-gray-300"
                              }`}
                            >
                              {isSelected && (
                                <Check className="w-3 h-3 text-white" />
                              )}
                            </span>
                            {role}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer with pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 mt-2 border-t border-gray-100 text-xs text-gray-500">
        <span>Showing 1 to {users.length} of 12 entries</span>

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
                  ? "bg-blue-600 text-white"
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
  );
}
