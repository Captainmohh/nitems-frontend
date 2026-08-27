import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRiskColor(level: string) {
  switch (level) {
    case "HIGH":   return { text: "text-danger",  bg: "bg-danger-dim",  label: "High Risk" };
    case "MEDIUM": return { text: "text-warning", bg: "bg-warning-dim", label: "Medium Risk" };
    case "LOW":    return { text: "text-yellow-400", bg: "bg-yellow-400/10", label: "Low Risk" };
    default:       return { text: "text-primary",  bg: "bg-primary-dim",  label: "No Reports" };
  }
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(amount);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-NG", { dateStyle: "medium" }).format(new Date(date));
}

export function getIdentifierTypeLabel(type: string) {
  switch (type) {
    case "PHONE":        return "Phone Number";
    case "BANK_ACCOUNT": return "Bank Account";
    case "SOCIAL_HANDLE": return "Social Handle";
    default: return type;
  }
}
