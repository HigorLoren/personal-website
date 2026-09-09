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
  /** base64 do e-mail de contato — decodificado só no client pelo <EmailLink>,
   *  nunca vai pré-renderizado no HTML servido (repo público, anti-harvesting). */
  emailEncoded: "ZGV2X2guY2VydmVsaW5Ab3V0bG9vay5jb20=",
  social: {
    github: "https://github.com/HigorLoren",
    linkedin: "https://www.linkedin.com/in/higorlorenzon/",
  },
} as const;

export const nav = [
  { href: "/", label: "Início" },
  { href: "/#cases", label: "Cases" },
  { href: "/#sobre", label: "Sobre" },
] as const;

export const contactHref = "/contato";
