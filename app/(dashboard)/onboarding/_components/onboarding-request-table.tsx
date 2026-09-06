"use client";

import { flexRender } from "@tanstack/react-table";
import { useLegacyTable, getCoreRowModel } from "@tanstack/react-table/legacy";
import type { LegacyColumnDef } from "@tanstack/react-table/legacy";
import { Badge } from "@/components/ui/badge";
import { MoreVertical } from "lucide-react"; 

type OnboardingStatus = "pending" | "active";

interface OnboardingRequest {
  id: string;
  name: string;
  employeeId: string;
  email: string;
  dueDate: string;
  status: OnboardingStatus;
}

const avatarColors = [
  "bg-orange-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-teal-500",
  "bg-indigo-500",
];

function getAvatarColor(name: string) {
  const firstLetter = name.charAt(0).toUpperCase();
  const alphabetPosition = firstLetter.charCodeAt(0) - "A".charCodeAt(0);
  return avatarColors[alphabetPosition % avatarColors.length];
}

const mockData: OnboardingRequest[] = [
  {
    id: "1",
    name: "Yusuf Mustapha",
    employeeId: "#5632",
    email: "myusuf@nitda.gov.ng",
    dueDate: "27 Mar 2026",
    status: "pending",
  },
  {
    id: "2",
    name: "Maryam Lala",
    employeeId: "#5632",
    email: "mshuaibu@nitda.gov.ng",
    dueDate: "27 Mar 2026",
    status: "pending",
  },
  {
    id: "3",
    name: "Mukhtar Adepoju",
    employeeId: "#5632",
    email: "madepoju@nitda.gov.ng",
    dueDate: "27 Mar 2026",
    status: "pending",
  },
  {
    id: "4",
    name: "Usman Abubakar",
    employeeId: "#5632",
    email: "uabubakar@nitda.gov.ng",
    dueDate: "27 Mar 2026",
    status: "pending",
  },
  {
    id: "5",
    name: "Maryam Magama",
    employeeId: "#5632",
    email: "mmagama@nitda.gov.ng",
    dueDate: "27 Mar 2026",
    status: "pending",
  }
];

const columns: LegacyColumnDef<OnboardingRequest>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div
        className={`w-9 h-9 rounded-md flex items-center justify-center text-sm font-bold text-white ${getAvatarColor(
         row.original.name
      )}`}
>
  {row.original.name.charAt(0)}
</div>
        <div>
          <p className="text-sm font-medium text-gray-900">
            {row.original.name}
          </p>
          <p className="text-xs text-gray-400">{row.original.employeeId}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">{row.original.email}</span>
    ),
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">{row.original.dueDate}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status}>
        {row.original.status === "pending" ? "Pending" : "Active"}
      </Badge>
    ),
  },
  {
    id: "action",
    header: "Action",
    cell: () => (
    <button className="text-gray-400 hover:text-gray-600">
      <MoreVertical className="w-4 h-4" />
    </button>
  ),
  },
];

export function OnboardingRequestTable() {
  const table = useLegacyTable({
    data: mockData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full border-collapse">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="border-b border-gray-100">
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide py-3 px-4"
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border-b border-gray-50">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="py-4 px-4">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}