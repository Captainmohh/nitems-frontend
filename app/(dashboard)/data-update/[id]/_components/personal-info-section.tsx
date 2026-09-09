"use client";

import { useState } from "react";

const mockPersonalInfo = {
  firstName: "Mukhtar",
  lastName: "Adepoju",
  otherNames: "Mohammad",
  gender: "Male",
  maritalStatus: "Married",
  dateOfBirth: "27/04/2026",
  stateOfOrigin: "Kwara State",
  personalEmail: "madepoju@gmail.com",
  phone: "08069155436",
  address: "24 Tafawa Balewa crescent, Abuja",
};

 export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500 w-32 shrink-0">{label}</span>
      <span className="text-sm font-semibold text-gray-900">{value}</span>
    </div>
  );
}

export function PersonalInfoSection() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="bg-accent-green px-5 py-3">
        <h3 className="text-white font-semibold">Personal Information</h3>
      </div>
      <div className="px-5 py-2">
        <InfoRow label="First Name" value={mockPersonalInfo.firstName} />
        <InfoRow label="Last Name" value={mockPersonalInfo.lastName} />
        <InfoRow label="Other Names ID" value={mockPersonalInfo.otherNames} />
        <InfoRow label="Gender" value={mockPersonalInfo.gender} />
        <InfoRow label="Marital Status" value={mockPersonalInfo.maritalStatus} />
        <InfoRow label="Date of Birth" value={mockPersonalInfo.dateOfBirth} />
        <InfoRow label="State of Origin" value={mockPersonalInfo.stateOfOrigin} />
        <InfoRow label="Personal Email" value={mockPersonalInfo.personalEmail} />
        <InfoRow label="Phone" value={mockPersonalInfo.phone} />
        <InfoRow label="Address" value={mockPersonalInfo.address} />
      </div>
    </div>
  );
}

const departments = [
  "Financial Management and Control",
  "Information Technology Department",
  "Human Resources",
];

const roles = ["Accountant", "Officer I", "Manager"];
const employmentCategories = ["Permanent", "Contract"];
const gradeLevels = ["06", "07", "08", "09"];
const steps = ["1", "2", "3", "4"];
const officeLocations = ["NITDA Headquarters", "Regional Office"];

export function DepartmentAssignmentSection() {
  const [department, setDepartment] = useState(departments[0]);
  const [role, setRole] = useState(roles[0]);
  const [employmentCategory, setEmploymentCategory] = useState(
    employmentCategories[0]
  );
  const [gradeLevel, setGradeLevel] = useState(gradeLevels[2]);
  const [step, setStep] = useState(steps[2]);
  const [officeLocation, setOfficeLocation] = useState(officeLocations[0]);
  const [adminComment, setAdminComment] = useState("");

return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="bg-accent-green px-5 py-3">
        <h3 className="text-white font-semibold">Department Assignment</h3>
      </div>
      <div className="px-5 py-4 space-y-3">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Department</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-primary-green"
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-primary-green"
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Employment category
          </label>
          <select
            value={employmentCategory}
            onChange={(e) => setEmploymentCategory(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-primary-green"
          >
            {employmentCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Grade Level
            </label>
            <select
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-primary-green"
            >
              {gradeLevels.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Step</label>
            <select
              value={step}
              onChange={(e) => setStep(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-primary-green"
            >
              {steps.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Office Location
          </label>
          <select
            value={officeLocation}
            onChange={(e) => setOfficeLocation(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-primary-green"
          >
            {officeLocations.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Admin Comment (Optional)
          </label>
          <textarea
            value={adminComment}
            onChange={(e) => setAdminComment(e.target.value)}
            placeholder="Reason for sending back for update"
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-green resize-none"
          />
        </div>
        <div className="flex gap-3">
          <button className="flex-1 px-5 py-2.5 rounded-lg bg-accent-green text-white text-sm font-medium hover:bg-primary-green/90 transition-colors">
            Approve
          </button>
          <button className="flex-1 px-5 py-2.5 rounded-lg border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition-colors">
            Save Draft
          </button>
        </div>
      </div>
    </div>
  );
}