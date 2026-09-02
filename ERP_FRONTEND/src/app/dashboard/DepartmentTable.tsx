"use client";
import React from "react";

interface Department {
    name: string;
    strength: number;
}

const departments: Department[] = [
    { name: "CORPORATE PLANNING & STRATEGY", strength: 23 },
    { name: "IT INFRASTRUCTURE SOLUTIONS", strength: 34 },
    { name: "CYBERSECURITY", strength: 16 },
    { name: "REGULATIONS AND COMPLIANCE", strength: 7 },
    { name: "STAKEHOLDER MANAGEMENT & PARTNERSHIPS", strength: 9 },
    { name: "RESEARCH AND DEVELOPMENT", strength: 6 },
    { name: "DIGITAL LITERACY AND CAPACITY BUILDING", strength: 12 },
    { name: "CORPORATE COMMUNICATIONS & MEDIA RELATIONS", strength: 11 },
    { name: "HUMAN RESOURCE AND ADMINISTRATION", strength: 79 },
    { name: "PROJECT MANAGEMENT", strength: 15 },
    { name: "AUDIT AND INTERNAL CONTROL", strength: 8 },
    { name: "FINANCIAL MANAGEMENT AND CONTROL", strength: 16 },
    { name: "DG OFFICE", strength: 9 },
];

export default function DepartmentTable() {
    return (
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex flex-col h-full">
            <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-4">
                Department /Unit Count
            </h2>

            <div className="overflow-x-auto flex-1">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-100 text-[11px] font-semibold text-gray-500 uppercase">
                            <th className="pb-3">Department</th>
                            <th className="pb-3 text-right">Staff Strength</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-xs">
                        {departments.map((dept, index) => (
                            <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                <td className="py-2.5 text-gray-700 font-medium text-[11px]">
                                    {dept.name}
                                </td>
                                <td className="py-2.5 text-right font-bold text-gray-900 text-xs">
                                    {dept.strength}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}