import { HTMLAttributes } from "react";
import { clsx } from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: boolean;
}

export function Card({ padding = true, className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "bg-white border border-gray-200 rounded-2xl shadow-sm",
        padding && "p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx("flex items-center justify-between mb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={clsx("text-base font-semibold text-gray-900", className)} {...props}>
      {children}
    </h3>
  );
}
