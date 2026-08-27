"use client";
import { Building2, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import { TopBar } from "@/components/layout/TopBar";
import { Card } from "@/components/ui/Card";
import { useAuthStore } from "@/store/auth";

const adminTiles = [
  { href: "/dashboard/users", label: "Employees", icon: Users, description: "Manage staff records" },
  { href: "/dashboard/departments", label: "Departments", icon: Building2, description: "Manage org structure" },
  { href: "/dashboard/audit", label: "Audit Trail", icon: ShieldCheck, description: "Review recent changes" },
];

export default function DashboardPage() {
  const { user, isHr } = useAuthStore();

  return (
    <>
      <TopBar title="Dashboard" subtitle={`Welcome back, ${user?.firstName ?? ""}`} />
      <div className="p-6 space-y-6">
        {isHr() ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {adminTiles.map(({ href, label, icon: Icon, description }) => (
              <Link key={href} href={href}>
                <Card padding={false} className="p-5 hover:shadow-md transition-shadow cursor-pointer h-full">
                  <div className="w-10 h-10 rounded-lg bg-[#1C4B40]/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-[#1C4B40]" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{label}</h3>
                  <p className="text-sm text-gray-500 mt-1">{description}</p>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="p-6">
            <h2 className="font-semibold text-gray-900 mb-1">Your Profile</h2>
            <p className="text-sm text-gray-500 mb-4">
              View your information or request a change from the Settings page.
            </p>
            <Link
              href="/dashboard/profile"
              className="inline-flex items-center text-sm font-medium text-[#1C4B40] hover:underline"
            >
              Go to Settings →
            </Link>
          </Card>
        )}
      </div>
    </>
  );
}
