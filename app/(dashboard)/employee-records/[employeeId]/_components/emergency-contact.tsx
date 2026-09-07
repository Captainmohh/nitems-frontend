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

export function EmergencyContact({ employee }: { employee?: Employee }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
      <div className="bg-[#22C55E] px-6 py-3.5 text-white font-bold text-sm tracking-wide">
        Emergency Contact
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <FieldItem label="First Name" value="Aisha" />
        <FieldItem label="Last Name" value="Yusuf" />
        <FieldItem label="Other Names" value="Mohammad" />

        <FieldItem label="Emergency Contact Mobile Number" value="0813 678 9912" />
        <FieldItem label="Emergency Contact Relationship" value="Spouse" />
        <FieldItem label="Emergency Contact Address" value="12 Aminu Kano Crescent, Abuja" />
      </div>
    </div>
  );
}