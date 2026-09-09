/**
 * Single source of truth for site-wide constants: identity, contact surface,
 * navigation. Kept separate from copy (see src/i18n) so links and structure
 * stay stable while wording can be translated later.
 */
export const site = {
  name: "Higor Lorenzon",
  role: "Desenvolvedor Frontend",
  domain: "higorlorenzon.vercel.app",
  url: "https://higorlorenzon.vercel.app",
  email: "higor.cervelin@gmail.com",
  cvPath: "/cv/higor-lorenzon-cv.pdf",
  social: {
    github: "https://github.com/HigorLoren",
    linkedin: "https://www.linkedin.com/in/higorlorenzon/",
  },
} as const;

export const nav = [
  { href: "/", label: "Início" },
  { href: "/#cases", label: "Cases" },
  { href: "/sobre", label: "Sobre" },
] as const;
