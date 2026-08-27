import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In — NITDA ERP",
  description: "Sign in to NITDA ERP.",
  alternates: { canonical: "https://erp.nitda.gov.ng/auth/sign-in" },
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
