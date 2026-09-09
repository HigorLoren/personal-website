import { Bricolage_Grotesque, Newsreader } from "next/font/google";

// Bricolage Grotesque — display, UI and short-form text. A variable grotesque
// with an irregular, "assembled" personality that fits a portfolio built around
// prototyping and iteration. Google Fonts (SIL Open Font License).
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

// Newsreader — long-form reading only (case study bodies). A text serif with
// real italics; gives the case pages a document register distinct from the
// Bricolage marketing surface. Google Fonts (SIL Open Font License).
export const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});
