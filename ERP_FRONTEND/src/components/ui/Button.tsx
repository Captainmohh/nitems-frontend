import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading = false, disabled, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-[#1C4B40]/30 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-[#1C4B40] text-white hover:bg-[#254f43] active:scale-[0.98]": variant === "primary",
            "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50": variant === "secondary",
            "text-gray-500 hover:text-gray-800 hover:bg-gray-100": variant === "ghost",
            "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100": variant === "danger",
            "border border-gray-200 text-gray-700 hover:bg-gray-50": variant === "outline",
            "text-xs px-3 py-1.5 rounded-lg": size === "sm",
            "text-sm px-4 py-2.5": size === "md",
            "text-base px-6 py-3 rounded-xl": size === "lg",
          },
          className
        )}
        {...props}
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
