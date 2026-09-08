"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Search, Mail, Bell, Menu } from "lucide-react";

interface TopHeaderProps {
  onToggleCollapse?: () => void;
  onOpenMobileNav?: () => void;
}

const NOTIFICATIONS = [
  {
    id: "1",
    title: "New onboarding request",
    detail: "Usman Abubakar submitted an onboarding form.",
    time: "5m ago",
    dotColor: "bg-[#EA580C]",
  },
  {
    id: "2",
    title: "Profile approved",
    detail: "Maryam Lala's profile update was approved.",
    time: "1h ago",
    dotColor: "bg-[#16A34A]",
  },
  {
    id: "3",
    title: "Role assigned",
    detail: "Mukthar Adepoju was assigned the Super Admin role.",
    time: "3h ago",
    dotColor: "bg-[#2563EB]",
  },
];

export function TopHeader({
  onToggleCollapse,
  onOpenMobileNav,
}: TopHeaderProps) {
  const [search, setSearch] = useState("");
  const [openPanel, setOpenPanel] = useState<"mail" | "notifications" | null>(
    null
  );
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpenPanel(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20">
      {/* Left: Toggles + Mobile Brand Logo + Search Bar */}
      <div className="flex items-center gap-2.5 sm:gap-4 flex-1 max-w-md">
        {/* Desktop Collapse Toggle */}
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label="Toggle Desktop Sidebar"
          className="hidden md:flex text-gray-500 hover:text-gray-900 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile Menu Drawer Toggle */}
        <button
          type="button"
          onClick={onOpenMobileNav}
          aria-label="Open Navigation Menu"
          className="md:hidden text-gray-700 hover:text-gray-900 p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile Brand Logo */}
        <div className="flex items-center gap-1.5 md:hidden shrink-0">
          <Image
            src="/nitems-logo.png"
            alt="nitems Logo"
            width={28}
            height={28}
            className="w-7 h-7 object-contain"
          />
          <span className="text-lg font-[900] text-[#0B4A2D] tracking-tight lowercase">
            nitems
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-[160px] xs:max-w-[200px] sm:max-w-sm">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="w-full bg-[#F3F4F6]/70 text-xs text-gray-800 rounded-lg pl-9 pr-3 sm:pr-4 py-1.5 sm:py-2 border-transparent focus:bg-white focus:border-gray-200 focus:outline-none transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Right: Actions (Messages & Notifications) */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <div
          className="relative"
          ref={openPanel === "mail" ? panelRef : undefined}
        >
          <button
            type="button"
            aria-label="Messages"
            onClick={(e) => {
              e.stopPropagation();
              setOpenPanel(openPanel === "mail" ? null : "mail");
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F3F4F6]/70 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Mail className="w-4 h-4" />
          </button>

          {openPanel === "mail" && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-30 text-left animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 py-3 border-b border-gray-100">
                <span className="text-sm font-semibold text-gray-900">
                  Messages
                </span>
              </div>
              <div className="px-4 py-8 text-center text-xs text-gray-400">
                No new messages
              </div>
            </div>
          )}
        </div>

        <div
          className="relative"
          ref={openPanel === "notifications" ? panelRef : undefined}
        >
          <button
            type="button"
            aria-label="Notifications"
            onClick={(e) => {
              e.stopPropagation();
              setOpenPanel(openPanel === "notifications" ? null : "notifications");
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F3F4F6]/70 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            {/* Unread Alert Dot */}
            <span className="w-2 h-2 bg-[#EA580C] rounded-full absolute top-1.5 right-1.5 sm:top-2 sm:right-2 border-2 border-white" />
          </button>

          {openPanel === "notifications" && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-30 text-left animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 py-3 border-b border-gray-100">
                <span className="text-sm font-semibold text-gray-900">
                  Notifications
                </span>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                {NOTIFICATIONS.map((n) => (
                  <div
                    key={n.id}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50/70 transition-colors"
                  >
                    <span
                      className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.dotColor}`}
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-900">
                        {n.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {n.detail}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        {n.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}