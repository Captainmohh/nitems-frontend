"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1C4B40",
            color: "#F0F7F4",
            border: "1px solid #315B44",
            borderRadius: "12px",
            fontSize: "13px",
          },
          success: {
            iconTheme: { primary: "#7EC8A4", secondary: "#1C4B40" },
          },
          error: {
            iconTheme: { primary: "#EF4444", secondary: "#1C4B40" },
          },
        }}
      />
    </QueryClientProvider>
  );
}
