import { InputHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
        )}
        <input
          ref={ref}
          className={clsx(
            "w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400",
            "focus:outline-none focus:border-[#1C4B40] focus:ring-2 focus:ring-[#1C4B40]/10 transition-colors",
            error && "border-red-400 focus:border-red-500 focus:ring-red-200",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
