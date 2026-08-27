"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Building2,
  Users,
  LogOut,
  Settings,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { clsx } from "clsx";
import { useAuthStore } from "@/store/auth";

const adminLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/departments", label: "Departments", icon: Building2 },
  { href: "/dashboard/users", label: "Employees", icon: Users },
  { href: "/dashboard/audit", label: "Audit Trail", icon: ShieldCheck },
  { href: "/dashboard/profile", label: "Settings", icon: Settings },
];

const staffLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/profile", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout, isAdmin, isHr } = useAuthStore();

  const links = isAdmin() || isHr() ? adminLinks : staffLinks;

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-56 bg-[#1C3D33] flex flex-col h-screen sticky top-0 flex-shrink-0">
      {/* Logo block */}
      <div className="flex flex-col items-center justify-center py-6 border-b border-white/10">
        <div className="bg-white rounded-xl px-3 py-2 mb-2">
          <Image
            src="/nitda-logo.png"
            alt="NITDA"
            width={80}
            height={28}
            className="object-contain"
          />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7EC8A4] mt-1">
          ERP
        </p>
      </div>

      {/* MAIN MENU label */}
      <p className="text-[9px] font-bold uppercase tracking-widest text-white/30 px-5 pt-5 pb-2">
        Main Menu
      </p>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto sidebar-scroll px-3 space-y-0.5 pb-4">
        {links.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact);
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                active
                  ? "bg-white/15 text-white"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className={clsx("w-4 h-4 flex-shrink-0", active ? "text-[#7EC8A4]" : "text-white/50")} />
              <span>{label}</span>
              {active && (
                <span className="ml-auto w-1.5 h-5 rounded-full bg-[#7EC8A4]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: NITDA site + logout */}
      <div className="p-3 border-t border-white/10 space-y-0.5">
        <a
          href="https://nitda.gov.ng"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-all"
        >
          <Globe className="w-4 h-4 text-white/50" />
          <span>NITDA Website</span>
        </a>

        <button
          onClick={() => {
            logout();
            window.location.href = "/auth/sign-in";
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:bg-red-500/20 hover:text-red-300 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>

        {user && (
          <div className="mt-2 px-3 py-2.5 rounded-lg bg-white/10 border border-white/10">
            <p className="text-xs font-semibold text-white truncate">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-[10px] text-white/50 truncate">{user.email}</p>
          </div>
        )}
      </div>
    </aside>
  );
}
