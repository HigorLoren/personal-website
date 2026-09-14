import type { CaseMeta } from "@/content/types";

export const meta: CaseMeta = {
  slug: "card-finder",
  title: "Card Finder — a via óbvia não passou no teste",
  tagline:
    "Foto de cartas de Pokémon vira preço de mercado. O jeito óbvio de reconhecer a carta falhou com fotos reais, e o que ficou foi o que passou no teste.",
  year: "2026",
  role: "Serviço de identificação por visão computacional; apps mobile e web em dupla",
  summary:
    "App em React Native e uma versão web que identificam cartas de Pokémon numa foto e devolvem o valor de mercado, ou uma lista de deck pronta para importar. A identificação roda num serviço próprio de visão computacional. O caminho óbvio falhou com fotos reais, e o método e o limiar de aceite que ficaram saíram do teste.",
  pillars: ["produto", "tecnica"],
  stack: [
    "React Native",
    "Expo",
    "TypeScript",
    "Vite",
    "Python",
    "FastAPI",
    "OpenAPI",
  ],
  cover: "/assets/cases/card-finder/cover.svg",
  order: 3,
};
