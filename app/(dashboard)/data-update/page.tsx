import { RefreshCw } from "lucide-react";
import { DataUpdateTable } from "./_components/data-update-table";

export default function DataUpdatePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <RefreshCw className="w-7 h-7 text-primary-green" />
        <h1 className="text-2xl font-semibold text-primary-green">
          Data Update
        </h1>
      </div>

      <DataUpdateTable />
    </div>
  );
}
