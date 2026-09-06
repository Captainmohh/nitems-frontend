import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NITEMS - NITDA Employee Management System",
  description: "NITDA ERP Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#F8F9FA] text-gray-900">
        {children}
      </body>
    </html>
  );
}