import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

const SITE_URL = "https://erp.nitda.gov.ng";
const SITE_NAME = "NITDA ERP";
const DEFAULT_TITLE = "NITDA ERP";
const DEFAULT_DESCRIPTION =
  "Internal enterprise resource planning platform for the National Information Technology Development Agency (NITDA).";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,

  keywords: ["NITDA", "NITDA ERP", "employee management"],

  authors: [{ name: "NITDA", url: SITE_URL }],
  creator: "NITDA",
  publisher: "National Information Technology Development Agency",

  // Canonical
  alternates: {
    canonical: SITE_URL,
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NITDA ERP",
      },
    ],
  },

  // Twitter / X
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/og-image.png"],
    creator: "@NITDAng",
  },

  // Internal tool — keep out of search indexes
  robots: {
    index: false,
    follow: false,
  },

  // Icons
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

function MaintenancePage() {
  return (
    <html lang="en">
      <head>
        <title>Under Maintenance — NITDA ERP</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{ margin: 0, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f4f8", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: "48px 40px", maxWidth: 480, width: "90%", textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>🔧</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12, color: "#1a365d" }}>We'll be right back</h1>
          <p style={{ fontSize: 15, color: "#4a5568", lineHeight: 1.6, marginBottom: 8 }}>NITDA ERP is currently undergoing scheduled maintenance.</p>
          <p style={{ fontSize: 15, color: "#4a5568", lineHeight: 1.6 }}>We're working hard to improve your experience. Please check back shortly.</p>
          <div style={{ display: "inline-block", marginTop: 24, padding: "6px 16px", background: "#ebf8ff", color: "#2b6cb0", borderRadius: 9999, fontSize: 13, fontWeight: 600 }}>Maintenance in progress</div>
          <div style={{ marginTop: 32, fontSize: 12, color: "#a0aec0" }}>National Information Technology Development Agency &copy; {new Date().getFullYear()}</div>
        </div>
      </body>
    </html>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  if (isMaintenanceMode) return <MaintenancePage />;

  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col antialiased" style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
