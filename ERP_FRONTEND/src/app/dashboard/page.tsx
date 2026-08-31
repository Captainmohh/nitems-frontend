"use client";
import React from "react";
import { useAuthStore } from "@/store/auth";
import KpiCardGrid from "@/app/dashboard/KpiCardGrid"
import GenderDistributionChart from "@/app/dashboard/GenderDistributionChart";
import OfficeStationChart from "@/app/dashboard/OfficeStationChart";
import DepartmentTable from "@/app/dashboard/DepartmentTable";

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="p-6 space-y-6 bg-[#F8F9FA] min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#1C4B40] text-white p-6 rounded-2xl flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-xs text-emerald-100 mt-1">
            Welcome back, {user?.firstName ?? "Admin"} — here&apos;s what&apos;s happening today
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-emerald-200">Hello {user?.role ?? "Admin"}</span>
          <p className="text-xs text-white font-medium">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <KpiCardGrid />

      {/* Middle Grid: Demographics + Stations (Left) & Department Count (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-6">
          <GenderDistributionChart />
          <OfficeStationChart />
        </div>
        <div className="lg:col-span-7">
          <DepartmentTable />
        </div>
      </div>
    </div>
  );
}