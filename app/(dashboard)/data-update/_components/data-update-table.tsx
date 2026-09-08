"use client";

import { flexRender } from "@tanstack/react-table";
import {
  useLegacyTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table/legacy";
import type { LegacyColumnDef } from "@tanstack/react-table/legacy";
import Link from "next/link";
import { MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

type StaffStatus = "active" | "pending" | "terminated";

interface StaffRecord {
  id: string;
  name: string;
  email: string;
  staffId: string;
  department: string;
  status: StaffStatus;
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

const mockData: StaffRecord[] = [
  {
    id: "1",
    name: "Yusuf Mohammad Mustapha",
    email: "myusuf@nitda.gov.ng",
    staffId: "NITDA/HQ/410/P",
    department: "ITD",
    status: "active",
  },
  {
    id: "2",
    name: "Maryam Lala",
    email: "mshuaibu@nitda.gov.ng",
    staffId: "NITDA/HQ/589/C",
    department: "HRA",
    status: "active",
  },
  {
    id: "3",
    name: "Mukhtar Mohammad Adepoju",
    email: "madepoju@nitda.gov.ng",
    staffId: "NITDA/HQ/441/P",
    department: "FMC",
    status: "pending",
  },
  {
    id: "4",
    name: "Usman Abubakar",
    email: "uabubakar@nitda.gov.ng",
    staffId: "NITDA/HQ/590/C",
    department: "ITD",
    status: "active",
  },
  {
    id: "5",
    name: "Maryam Magama Ibrahim",
    email: "mmagama@nitda.gov.ng",
    staffId: "NITDA/HQ/432/P",
    department: "DG Office",
    status: "active",
  },
  {
    id: "6",
    name: "Egnr Ape",
    email: "Aape@nitda.gov.ng",
    staffId: "NITDA/HQ/432/P",
    department: "ITD",
    status: "terminated",
  },
];

const columns: LegacyColumnDef<StaffRecord>[] = [
  {
  accessorKey: "name",
  header: "Name",
  cell: ({ row }) => (
    <div className="flex items-center gap-3">
      <div
        className={`w-9 h-9 rounded-md flex items-center justify-center text-sm font-medium text-white ${getAvatarColor(
          row.original.name
        )}`}
      >
        {row.original.name.charAt(0)}
      </div>
      <p className="text-sm font-medium text-gray-900">
        {row.original.name}
      </p>
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
    accessorKey: "staffId",
    header: "Staff ID",
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">{row.original.staffId}</span>
    ),
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">{row.original.department}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status}>
        {row.original.status.charAt(0).toUpperCase() +
          row.original.status.slice(1)}
      </Badge>
    ),
  },
  {
  id: "action",
  header: "Action",
  cell: ({ row }) => <ActionMenu staffId={row.original.id} />,
},
];


function ActionMenu({ staffId }: { staffId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-400 hover:text-gray-600"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-6 z-10 w-40 bg-white border border-gray-100 rounded-lg shadow-lg py-1">
          <Link
            href={`/data-update/${staffId}`}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            View Profile
          </Link>
          <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50">
            Deactivate
          </button>
        </div>
      )}
    </div>
  );
}

export function DataUpdateTable() {
  const table = useLegacyTable({
  data: mockData,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  initialState: {
    pagination: {
      pageIndex: 0,
      pageSize: 5,
    },
  },
});

  return (
    <div>
    <table className="w-full border-collapse table-fixed">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="bg-gray-200 border-b border-gray-200">
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className={`text-left text-xs font-bold text-black uppercase tracking-wide py-3 px-3 ${
                  header.id === "name"
                    ? "w-[25%]"
                    : header.id === "email"
                    ? "w-[22%]"
                    : header.id === "staffId"
                    ? "w-[15%]"
                    : header.id === "department"
                    ? "w-[15%]"
                    : header.id === "status"
                    ? "w-[13%]"
                    : "w-[10%]"
                }`}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border-b border-gray-200">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="py-4 px-3">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>

    <div className="flex items-center justify-between px-3 py-4">
  <p className="text-sm text-gray-500">
    Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
    {Math.min(
      (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
      mockData.length
    )}{" "}
    of {mockData.length} entries
  </p>

  <div className="flex items-center gap-1">
    <button
      onClick={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}
      className="px-2 py-1 text-gray-400 disabled:opacity-30 hover:text-gray-600"
    >
      &lt;
    </button>

    {Array.from({ length: table.getPageCount() }, (_, i) => (
      <button
        key={i}
        onClick={() => table.setPageIndex(i)}
        className={`w-8 h-8 rounded-lg text-sm font-medium ${
          table.getState().pagination.pageIndex === i
            ? "bg-primary-green text-white"
            : "text-gray-500 hover:bg-gray-50"
        }`}
      >
        {i + 1}
      </button>
    ))}

    <button
      onClick={() => table.nextPage()}
      disabled={!table.getCanNextPage()}
      className="px-2 py-1 text-gray-400 disabled:opacity-30 hover:text-gray-600"
    >
      &gt;
    </button>
  </div>
</div>
</div>
  );
}