import { Employee } from "@/lib/data/employees";

function FieldItem({ label, value }: { label: string; value?: string }) {
  return (
    <div className="bg-[#FAFBFB] rounded-lg p-3.5 border border-gray-100/80">
      <span className="text-[10px] text-gray-400 font-medium block uppercase tracking-wider mb-1">
        {label}
      </span>
      <span className="text-xs font-bold text-gray-900 block truncate">
        {value || "—"}
      </span>
    </div>
  );
}

export function PerformanceInformation({ employee }: { employee?: Employee }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
      <div className="bg-[#22C55E] px-6 py-3.5 text-white font-bold text-sm tracking-wide">
        Performance Information
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <FieldItem label="Last Promotion Date" value="12 March 2022" />
        <FieldItem label="Last PAF Score" value="85%" />
        <FieldItem label="Staff Level at Entry" value="Grade Level 07" />
      </div>
    </div>
  );
}