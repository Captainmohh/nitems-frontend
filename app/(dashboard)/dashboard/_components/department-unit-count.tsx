"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";

type DepartmentData = {
  id: string;
  name: string;
  strength: number;
};

const DEFAULT_DATA: DepartmentData[] = [
  { id: "1", name: "CORPORATE PLANNING & STRATEGY", strength: 23 },
  { id: "2", name: "IT INFRASTRUCTURE SOLUTIONS", strength: 34 },
  { id: "3", name: "CYBERSECURITY", strength: 16 },
  { id: "4", name: "REGULATIONS AND COMPLIANCE", strength: 7 },
  { id: "5", name: "DIGITAL LITERACY & CAPACITY BUILDING", strength: 42 },
  { id: "6", name: "FINANCE & ACCOUNTS", strength: 19 },
  { id: "7", name: "HUMAN RESOURCES MANAGEMENT", strength: 28 },
  { id: "8", name: "PROCUREMENT SERVICES", strength: 11 },
];

export function DepartmentUnitCount() {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return DEFAULT_DATA;
    return DEFAULT_DATA.filter((item) =>
      item.name.toLowerCase().includes(term)
    );
  }, [search]);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs flex flex-col h-full">
      {/* Header & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
        <h3 className="text-xs font-bold tracking-wider text-gray-800 uppercase">
          DEPARTMENT / UNIT COUNT
        </h3>
        <div className="relative w-full sm:w-48">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search department..."
            className="w-full bg-gray-50 border border-gray-200 text-xs rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#0B4A2D] focus:border-[#0B4A2D]"
          />
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto mt-2">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100 text-gray-500 font-semibold text-xs tracking-wider uppercase">
              <th className="py-3 px-2">DEPARTMENT</th>
              <th className="py-3 px-2 text-right">STAFF STRENGTH</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/60 transition-colors"
                >
                  <td className="py-3 px-2 font-medium text-xs text-gray-700">
                    {item.name}
                  </td>
                  <td className="py-3 px-2 text-right font-semibold text-xs text-gray-900 pr-2">
                    {item.strength}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={2}
                  className="py-6 text-center text-xs text-gray-400"
                >
                  No matching departments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}