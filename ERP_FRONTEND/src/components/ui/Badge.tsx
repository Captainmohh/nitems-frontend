import { HTMLAttributes } from "react";
import { clsx } from "clsx";

type BadgeVariant = "success" | "warning" | "danger" | "muted" | "info";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const styles: Record<BadgeVariant, string> = {
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  danger:  "bg-red-50 text-red-600 border-red-200",
  muted:   "bg-gray-100 text-gray-600 border-gray-200",
  info:    "bg-blue-50 text-blue-600 border-blue-200",
};


export function Badge({ variant = "muted", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
