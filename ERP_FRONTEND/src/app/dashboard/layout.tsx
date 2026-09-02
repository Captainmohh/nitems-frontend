"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { Sidebar } from "@/components/layout/Sidebar";

const Spinner = () => (
  <div className="min-h-screen bg-[#F4F6F5] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[#1C4B40] border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, accessToken } = useAuthStore();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  // Wait for Zustand to rehydrate from localStorage before checking auth
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !accessToken && !user) {
      router.replace("/auth/sign-in");
    }
  }, [hydrated, accessToken, user, router]);

  if (!hydrated || !user) {
    return <Spinner />;
  }

  return (
    <div className="dashboard-root flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-[#F4F6F5]">{children}</main>
    </div>
  );
}
