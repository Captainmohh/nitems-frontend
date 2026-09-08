"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/config/nav";
import { Menu, X } from "lucide-react";

// Map nav keys and Lucide identifier strings to local public icons
const ICON_SRC_MAP: Record<string, string> = {
  "layout-dashboard": "/icons/dashboard.png",
  users: "/icons/employee-records.png",
  "user-plus": "/icons/onboarding.png",
  "refresh-cw": "/icons/data-update.png",
  shield: "/icons/user-management.png",
  settings: "/icons/settings.png",
  "log-out": "/icons/logout.png",

  dashboard: "/icons/dashboard.png",
  "employee-records": "/icons/employee-records.png",
  onboarding: "/icons/onboarding.png",
  "data-update": "/icons/data-update.png",
  "user-management": "/icons/user-management.png",
  logout: "/icons/logout.png",
};

function resolveIconSrc(iconKey: string): string {
  const normalizedKey = iconKey.toLowerCase().trim();
  return ICON_SRC_MAP[normalizedKey] || "/icons/dashboard.png";
}

interface SidebarProps {
  isCollapsed?: boolean;
  setIsCollapsed?: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileOpen?: boolean;
  setIsMobileOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Sidebar({
  isCollapsed = false,
  isMobileOpen = false,
  setIsMobileOpen,
}: SidebarProps) {
  const pathname = usePathname();

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen?.(false);
  }, [pathname, setIsMobileOpen]);

  // Prevent background scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileOpen]);

  const navContent = (collapsed: boolean) => (
    <>
      {/* Brand Logo & Typography Header */}
      <div
        className={`pt-2 pb-5 border-b border-gray-100 flex items-center overflow-hidden transition-all ${
          collapsed ? "justify-center px-0" : "px-1 justify-start gap-2.5"
        }`}
      >
        <Image
          src="/nitems-logo.png"
          alt="nitems Logo"
          width={43}
          height={43}
          className="w-11 h-11 shrink-0 object-contain"
          priority
        />
        {!collapsed && (
          <div className="flex flex-col justify-center min-w-0 flex-1 overflow-hidden">
            <span className="text-[24px] font-[900] text-[#0B4A2D] tracking-[-0.03em] leading-none lowercase truncate">
              nitems
            </span>
            <span className="text-[9px] uppercase tracking-[0.04em] text-gray-500 font-semibold leading-tight mt-1 truncate">
              NITDA EMPLOYEE MANAGEMENT SYSTEM
            </span>
          </div>
        )}
      </div>

      {/* Navigation Menu from config/nav.ts */}
      <nav className="flex-1 space-y-1.5 mt-4">
        {NAV_ITEMS.map((item) => {
          const iconSrc = resolveIconSrc(item.icon);
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              onClick={() => setIsMobileOpen?.(false)}
              className={`flex items-center rounded-xl text-sm font-semibold transition-all ${
                collapsed ? "justify-center px-0 py-3" : "gap-3.5 px-4 py-3 justify-start"
              } ${
                isActive
                  ? "bg-[#0B4A2D] text-white shadow-xs"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Image
                src={iconSrc}
                alt={item.label}
                width={22}
                height={22}
                className="w-5.5 h-5.5 shrink-0 object-contain"
              />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}

        {/* Logout Link */}
        <Link
          href="/sign-in"
          title={collapsed ? "Logout" : undefined}
          onClick={() => setIsMobileOpen?.(false)}
          className={`w-full flex items-center rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all text-left ${
            collapsed ? "justify-center px-0 py-3" : "gap-3.5 px-4 py-3 justify-start"
          }`}
        >
          <Image
            src="/icons/logout.png"
            alt="Logout"
            width={22}
            height={22}
            className="w-5.5 h-5.5 shrink-0 object-contain"
          />
          {!collapsed && <span>Logout</span>}
        </Link>
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile Drawer Slide-over (visible on < md screens when triggered) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileOpen?.(false)}
          />

          {/* Drawer Container */}
          <aside className="fixed inset-y-0 left-0 w-72 bg-white text-gray-800 p-5 flex flex-col shadow-2xl z-50 transform transition-transform animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-4">
              <span className="text-xs uppercase tracking-wider font-bold text-gray-400">
                Navigation
              </span>
              <button
                onClick={() => setIsMobileOpen?.(false)}
                className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {navContent(false)}
          </aside>
        </div>
      )}

      {/* Desktop Sidebar (visible on >= md screens) */}
      <aside
        className={`hidden md:flex bg-white border-r border-gray-100 text-gray-800 flex-col h-screen shrink-0 select-none sticky top-0 transition-all duration-300 ${
          isCollapsed ? "w-20 p-3" : "w-64 p-5"
        }`}
      >
        {navContent(isCollapsed)}
      </aside>
    </>
  );
}