import Image from "next/image";
import { DataUpdateTable } from "./_components/data-update-table";

export default function DataUpdatePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Image src="/loading-arrow 1.png" alt="Data Update" width={28} height={28} />
        <h1 className="text-2xl font-semibold text-accent-green">
          Data Update
        </h1>
      </div>

      <DataUpdateTable />
    </div>
  );
}
