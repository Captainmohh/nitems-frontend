import { Employee } from "@/lib/data/employees";

export function FinancialInformation({ employee }: { employee: Employee }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
      <div className="bg-[#22C55E] px-6 py-3 text-white font-bold text-sm tracking-wide">
        Financial Information
      </div>
      <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8">
        <div>
          <span className="text-xs text-gray-400 block">Bank Name</span>
          <span className="text-xs font-semibold text-gray-800 mt-1 block">
            Guaranty Trust Bank
          </span>
        </div>
        <div>
          <span className="text-xs text-gray-400 block">Bank Account Number</span>
          <span className="text-xs font-semibold text-gray-800 mt-1 block">
            0123456789
          </span>
        </div>
        <div>
          <span className="text-xs text-gray-400 block">Bank Account Name</span>
          <span className="text-xs font-semibold text-gray-800 mt-1 block">
            {employee.name}
          </span>
        </div>
        <div>
          <span className="text-xs text-gray-400 block">Pension Details</span>
          <span className="text-xs font-semibold text-gray-800 mt-1 block">
            ARM Pension Managers
          </span>
        </div>
        <div>
          <span className="text-xs text-gray-400 block">RSA Pin Number</span>
          <span className="text-xs font-semibold text-gray-800 mt-1 block">
            PEN100293847291
          </span>
        </div>
        <div>
          <span className="text-xs text-gray-400 block">TIN Number</span>
          <span className="text-xs font-semibold text-gray-800 mt-1 block">
            1234567890
          </span>
        </div>
      </div>
    </div>
  );
}