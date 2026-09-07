import { Employee } from "@/lib/data/employees";

interface FieldItemProps {
  label: string;
  value?: string | number;
}

function FieldItem({ label, value }: FieldItemProps) {
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

export function WorkInformation({ employee }: { employee: Employee }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
      <div className="bg-[#22C55E] px-6 py-3.5 text-white font-bold text-sm tracking-wide">
        Work Information
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <FieldItem label="Staff ID" value={employee.staffId} />
        <FieldItem label="Cadre" value="Software Solutions" />
        <FieldItem label="Title" value={employee.title || "Officer I"} />

        <FieldItem label="Department" value={employee.departmentFull || "Information Technology"} />
        <FieldItem label="Sub-Unit" value="Software Solution" />
        <FieldItem label="Employment Category" value="Permanent" />

        <FieldItem label="Line Manager" value="Usman Badamasi Abdullahi" />
        <FieldItem label="Manager of Line Manager" value="Dr Amina Sambo" />
        <FieldItem label="Level" value={employee.level || "8"} />

        <FieldItem label="Step" value={employee.step || "3"} />
        <FieldItem label="State Of Origin" value={employee.stateOfOrigin || "Osun State"} />
        <FieldItem label="Residential Address" value={employee.address || "12 Aminu Kano Crescent, Abuja"} />

        <FieldItem label="Work Email" value={employee.email} />
        <FieldItem label="Personal Mobile Number" value={employee.phone || "08172931149"} />
        <FieldItem label="Next Of Kin First Name" value={employee.nextOfKinFirst || "Mohammad"} />
      </div>
    </div>
  );
}