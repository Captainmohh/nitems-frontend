export function WelcomeBanner() {
  return (
    <div className="bg-[#0B4A2D] text-white rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-emerald-100/90 mt-1">
          Welcome back, <span className="font-semibold text-white">Admin</span> — here's what's happening today
        </p>
      </div>

      <div className="text-left md:text-right">
        <span className="text-xs text-emerald-200/80 block">Hello Admin</span>
        <span className="text-xs sm:text-sm font-semibold text-white mt-0.5 block">
          Wednesday, 15th July 2026
        </span>
      </div>
    </div>
  );
}