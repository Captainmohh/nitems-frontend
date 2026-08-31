"use client";
import React from "react";
import { Users, UserCheck, Clock, UserX, UserCheck2, UserMinus } from "lucide-react";

interface KpiItem {
    title: string;
    value: number | string;
    change: string;
    isPositive: boolean;
    icon: React.ElementType;
    iconColor: string;
    bgColor: string;
}

const kpiData: KpiItem[] = [
    {
        title: "Total Number of Employees",
        value: 500,
        change: "+288 this month",
        isPositive: true,
        icon: Users,
        iconColor: "text-emerald-700",
        bgColor: "bg-emerald-50",
    },
    {
        title: "Total Active Employees",
        value: 433,
        change: "+288 this month",
        isPositive: true,
        icon: UserCheck,
        iconColor: "text-blue-600",
        bgColor: "bg-blue-50",
    },
    {
        title: "Total Pending Employees",
        value: 15,
        change: "+288 this month",
        isPositive: true,
        icon: Clock,
        iconColor: "text-amber-600",
        bgColor: "bg-amber-50",
    },
    {
        title: "Total Inactive Employees",
        value: 67,
        change: "-288 this month",
        isPositive: false,
        icon: UserX,
        iconColor: "text-red-600",
        bgColor: "bg-red-50",
    },
    {
        title: "Total Male Employees",
        value: 300,
        change: "+288 this month",
        isPositive: true,
        icon: UserCheck2,
        iconColor: "text-indigo-600",
        bgColor: "bg-indigo-50",
    },
    {
        title: "Total Female Employees",
        value: 200,
        change: "+288 this month",
        isPositive: true,
        icon: UserMinus,
        iconColor: "text-pink-600",
        bgColor: "bg-pink-50",
    },
];

export default function KpiCardGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {kpiData.map((item, index) => {
                const Icon = item.icon;
                return (
                    <div
                        key={index}
                        className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <div className={`p-2 rounded-lg ${item.bgColor} ${item.iconColor}`}>
                                <Icon className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-medium text-gray-500">{item.title}</span>
                        </div>

                        <div className="flex items-baseline justify-between mt-1">
                            <span className="text-3xl font-bold text-gray-900">{item.value}</span>
                        </div>

                        <div className="mt-3 flex items-center gap-1.5">
                            <span
                                className={`text-[11px] font-semibold ${item.isPositive ? "text-emerald-600" : "text-red-500"
                                    }`}
                            >
                                {item.change}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}