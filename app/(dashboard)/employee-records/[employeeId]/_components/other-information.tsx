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

export function OtherInformation({ employee }: { employee?: Employee }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
      <div className="bg-[#22C55E] px-6 py-3.5 text-white font-bold text-sm tracking-wide">
        Other Information
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <FieldItem label="Staff Reliever 1" value="" />
        <FieldItem label="Staff Reliever 2" value="" />
        <FieldItem label="Exit Notice Period" value="" />

        <FieldItem label="Employee Status" value={employee?.status || "Active"} />
        <FieldItem label="Staff NHF Number" value="" />
        <FieldItem label="Staff Tax Payer ID" value="" />

        <FieldItem label="Staff Exit Status" value="" />
        <FieldItem label="Manager of Line Manager" value="Dr Amina Sambo" />
        <FieldItem label="Staff Exit Mode" value="" />

        <FieldItem label="Staff Exit Reason" value="" />
        <FieldItem label="Staff Exit Remark" value="" />
        <FieldItem label="Attachments" value="" />
      </div>
    </div>
  );
}