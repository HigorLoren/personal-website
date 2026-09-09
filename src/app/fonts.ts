import { Crimson_Pro, Plus_Jakarta_Sans } from "next/font/google";

// Crimson Pro — display/heading serif, editorial register. Fetched from Google
// Fonts at build time (SIL Open Font License, commercial use permitted).
export const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-crimson",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

// Plus Jakarta Sans — body/UI sans. Google Fonts (SIL Open Font License).
export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Helvetica",
    "Arial",
    "sans-serif",
  ],
});
