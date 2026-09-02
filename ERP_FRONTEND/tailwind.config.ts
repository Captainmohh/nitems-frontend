import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ── NITDA brand ──────────────────────────────
        bg:             "#1F3B31",   // darkest green — page background
        surface:        "#1C4B40",   // mid green — cards / panels
        "surface-hover":"#254f43",   // hover state
        border:         "#315B44",   // lighter green — borders
        "border-hover": "#3d7057",
        primary:        "#315B44",   // CTA / interactive
        "primary-dim":  "rgba(49,91,68,0.18)",
        accent:         "#7EC8A4",   // light mint — highlights
        text:           "#F0F7F4",   // near-white with green tint
        muted:          "#A8C4B8",
        subtle:         "#7A9E91",
        // ── Semantic (unchanged) ─────────────────────
        warning:        "#F59E0B",
        "warning-dim":  "rgba(245,158,11,0.15)",
        danger:         "#EF4444",
        "danger-dim":   "rgba(239,68,68,0.15)",
        success:        "#4ADE80",
        "success-dim":  "rgba(74,222,128,0.15)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      borderColor: {
        DEFAULT: "#1B2447",
      },
    },
  },
  plugins: [],
};

export default config;
