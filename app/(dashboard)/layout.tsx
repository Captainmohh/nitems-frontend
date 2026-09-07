"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { TopHeader } from "@/components/layout/top-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#F8F9FA]">
      {/* Sidebar Navigation */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader
          onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
          onOpenMobileNav={() => setIsMobileOpen(true)}
        />
        <main className="flex-1 px-4 sm:px-6 md:px-8 pt-3 md:pt-4 pb-6 md:pb-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}