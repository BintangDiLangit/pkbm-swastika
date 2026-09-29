import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
    },
    extend: {
      colors: {
        primary: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        accent: {
          50: "#FEFCE8",
          100: "#FEF9C3",
          200: "#FEF08A",
          300: "#FDE047",
          400: "#FACC15",
          500: "#EAB308",
          600: "#CA8A04",
        },
        soft: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
        },
        ink: {
          DEFAULT: "#0F172A",
          muted: "#475569",
          soft: "#64748B",
        },
        // palet website publik (navy & gold); primary/accent/soft/ink dipakai panel admin
        navy: {
          DEFAULT: "#1a3a7a",
          50: "#eef2fa",
          100: "#d6e0f3",
          600: "#1f4591",
          700: "#1a3a7a",
          800: "#142d60",
          900: "#0e2046",
          950: "#081530",
        },
        gold: {
          DEFAULT: "#f5c518",
          light: "#f9d95e",
          dark: "#d9a90a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["var(--font-poppins)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(15, 23, 42, 0.12)",
        soft: "0 4px 16px -6px rgba(15, 23, 42, 0.08)",
        glow: "0 20px 50px -20px rgba(29, 78, 216, 0.45)",
        "card-hover": "0 30px 60px -20px rgba(26, 58, 122, 0.35)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
