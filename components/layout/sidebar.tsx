"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/config/nav";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  RefreshCw,
  Shield,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

// Map icon string names from config/nav.ts to Lucide React components
const ICON_MAP: Record<string, React.ElementType> = {
  "layout-dashboard": LayoutDashboard,
  users: Users,
  "user-plus": UserPlus,
  "refresh-cw": RefreshCw,
  shield: Shield,
  settings: Settings,
};

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  const navContent = (
    <>
      {/* Brand Logo & Typography */}
      <div className="pt-2 pb-6 px-2 flex items-center gap-2">
        <Image
          src="/nitems-logo.png"
          alt="nitems Logo"
          width={40}
          height={40}
          className="w-10 h-10 shrink-0 object-contain"
          priority
        />
        <div className="flex flex-col justify-center">
          <span className="text-[26px] font-[900] text-white tracking-[-0.03em] leading-none lowercase">
            nitems
          </span>
          <span className="text-[6px] uppercase tracking-[0.04em] text-white/80 font-normal leading-tight mt-1 whitespace-nowrap">
            NITDA EMPLOYEE MANAGEMENT SYSTEM
          </span>
        </div>
      </div>

      {/* Navigation Menu from config/nav.ts */}
      <nav className="flex-1 space-y-1.5 mt-2">
        {NAV_ITEMS.map((item) => {
          const Icon = ICON_MAP[item.icon] || LayoutDashboard;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
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

        {/* Logout Link */}
        <Link
          href="/sign-in"
          onClick={() => setMobileOpen(false)}
          className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-white/85 hover:bg-white/10 hover:text-white transition-all text-left"
        >
          <LogOut className="w-4 h-4 shrink-0 text-white/80" />
          <span>Logout</span>
        </Link>
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile Header Bar (visible on < md screens) */}
      <header className="md:hidden sticky top-0 z-30 bg-[#0B4D3C] text-white px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <Image
            src="/nitems-logo.png"
            alt="nitems Logo"
            width={32}
            height={32}
            className="w-8 h-8 shrink-0 object-contain"
          />
          <div className="flex flex-col justify-center">
            <span className="text-xl font-[900] text-white tracking-[-0.03em] leading-none lowercase">
              nitems
            </span>
            <span className="text-[5.5px] uppercase tracking-[0.03em] text-white/80 font-normal leading-tight mt-0.5 whitespace-nowrap">
              NITDA EMPLOYEE MANAGEMENT SYSTEM
            </span>
          </div>
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* Mobile Drawer Slide-over */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Container */}
          <aside className="fixed inset-y-0 left-0 w-72 bg-[#0B4D3C] text-white p-5 flex flex-col shadow-2xl z-50 transform transition-transform animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-200">
                Navigation
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {navContent}
          </aside>
        </div>
      )}

      {/* Desktop Sidebar (visible on >= md screens) */}
      <aside className="hidden md:flex w-64 bg-[#0B4D3C] text-white flex-col h-screen shrink-0 p-5 select-none sticky top-0">
        {navContent}
      </aside>
    </>
  );
}