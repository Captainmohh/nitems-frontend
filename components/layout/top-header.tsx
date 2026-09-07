"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Mail, Bell, Menu } from "lucide-react";

interface TopHeaderProps {
  onToggleCollapse?: () => void;
  onOpenMobileNav?: () => void;
}

export function TopHeader({
  onToggleCollapse,
  onOpenMobileNav,
}: TopHeaderProps) {
  const [search, setSearch] = useState("");

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
        <button
          type="button"
          aria-label="Messages"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F3F4F6]/70 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <Mail className="w-4 h-4" />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F3F4F6]/70 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors relative"
        >
          <Bell className="w-4 h-4" />
          {/* Unread Alert Dot */}
          <span className="w-2 h-2 bg-[#EA580C] rounded-full absolute top-1.5 right-1.5 sm:top-2 sm:right-2 border-2 border-white" />
        </button>
      </div>
    </header>
  );
}