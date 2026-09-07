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

export function PersonalInformation({ employee }: { employee: Employee }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
      <div className="bg-[#22C55E] px-6 py-3.5 text-white font-bold text-sm tracking-wide">
        Personal Information
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <FieldItem label="First Name" value={employee.firstName} />
        <FieldItem label="Last Name" value={employee.lastName} />
        <FieldItem label="Other Names ID" value={employee.otherNames} />

        <FieldItem label="Gender" value={employee.gender} />
        <FieldItem label="Marital Status" value={employee.maritalStatus} />
        <FieldItem label="Date Of Birth" value={employee.dob} />

        <FieldItem label="Religion" value={employee.religion} />
        <FieldItem label="Qualifications" value={employee.qualifications} />
        <FieldItem label="Other Qualification" value={employee.otherQualifications} />

        <FieldItem label="Nationality" value={employee.nationality} />
        <FieldItem label="State Of Origin" value={employee.stateOfOrigin} />
        <FieldItem label="LGA" value={employee.lga} />

        <FieldItem label="Personal Email" value={employee.personalEmail} />
        <FieldItem label="Phone" value={employee.phone} />
        <FieldItem label="Address" value={employee.address} />

        <FieldItem label="Next Of Kin First Name" value={employee.nextOfKinFirst} />
        <FieldItem label="Next Of Kin Last Name" value={employee.nextOfKinLast} />
        <FieldItem label="Next Of Kin Mobile Number" value={employee.nextOfKinPhone} />

        <FieldItem label="Next Of Kin Relationship" value={employee.nextOfKinRelationship} />
        <div className="sm:col-span-2">
          <FieldItem label="Next Of Kin Address" value={employee.nextOfKinAddress} />
        </div>
      </div>
    </div>
  );
}