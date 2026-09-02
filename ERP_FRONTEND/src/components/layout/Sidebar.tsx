"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import {
  Home,
  Contact,
  UserPlus,
  RefreshCw,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Employee Records", href: "/dashboard/employee-records", icon: Contact },
  { label: "Onboarding", href: "/dashboard/onboarding", icon: UserPlus },
  { label: "Data Update", href: "/dashboard/data-update", icon: RefreshCw },
  { label: "User Management", href: "/dashboard/user-management", icon: Users },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace("/auth/sign-in");
  };

  return (
    <aside className="w-64 bg-[#0B4D3C] text-white flex flex-col h-screen shrink-0 p-5 select-none">
      {/* Brand Logo & Typography */}
      <div className="pt-2 pb-8 px-2 flex items-center gap-0">
        <Image
          src="/nitems-logo.png"
          alt="nitems Logo"
          width={44}
          height={44}
          className="w-13 h-13 shrink-0 object-contain"
          priority
        />
        <div className="flex flex-col justify-center">
          <span className="text-[28px] font-[900] text-white tracking-[-0.03em] leading-none lowercase">
            nitems
          </span>
          <span className="text-[6.5px] uppercase tracking-[0.04em] text-white/80 font-normal leading-tight mt-1 whitespace-nowrap">
            NITDA EMPLOYEE MANAGEMENT SYSTEM
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-white text-[#0B4D3C] font-bold shadow-sm"
                  : "text-white/85 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive ? "text-[#0B4D3C]" : "text-white/80"
                }`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-white/85 hover:bg-white/10 hover:text-white transition-all text-left"
        >
          <LogOut className="w-4 h-4 shrink-0 text-white/80" />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}