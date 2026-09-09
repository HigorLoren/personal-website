import type { CaseMeta } from "@/content/types";

export const meta: CaseMeta = {
  slug: "card-finder",
  title: "Card Finder — um modelo de visão que não tem a última palavra",
  tagline:
    "Foto de cartas de Pokémon vira preço de mercado, com toda leitura da IA conferida antes de chegar na tela.",
  year: "2026",
  role: "Desenvolvimento mobile e web, em dupla",
  summary:
    "App em React Native e uma versão web que identificam cartas de Pokémon numa foto e devolvem o valor de mercado, ou uma lista de deck pronta para importar. A leitura visual é feita por um modelo de IA, e nenhuma carta que ele diz ter visto entra no produto sem ser conferida numa fonte que pode dizer não.",
  pillars: ["produto", "tecnica"],
  stack: [
    "React Native",
    "Expo",
    "TypeScript",
    "Vite",
    "Google Gemini",
    "OpenAPI",
  ],
  cover: "/assets/cases/card-finder/cover.svg",
  order: 3,
};
