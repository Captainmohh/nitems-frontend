import TopBar from "@/components/layout/TopBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar placeholder - will be replaced once Sidebar component is ready */}
      <aside className="w-64 shrink-0 border-r border-gray-100 bg-white">
        <div className="p-4 text-sm text-gray-400">Sidebar goes here</div>
      </aside>

      {/* Right side: TopBar + page content stacked vertically */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
