import type { CaseMeta } from "@/content/types";

export const meta: CaseMeta = {
  slug: "saas-turismo",
  title: "SaaS de turismo — a média escondia a falha",
  tagline:
    "As buscas falhavam sem acusar erro. Antes de construir a observabilidade, montei um simulador para testar onde a falha se escondia.",
  year: "2025–2026",
  role: "Engenheiro de software fullstack: investigação e módulo de observabilidade",
  summary:
    "Produto de turismo com assinatura paga, desenvolvido para um cliente. As buscas de passagem falhavam sem acusar erro, e o trabalho foi descobrir onde a falha estava e testar a hipótese num protótipo antes de escrever a v1 da observabilidade.",
  pillars: ["produto", "tecnica"],
  stack: ["TypeScript", "NestJS", "PostgreSQL", "Redis"],
  cover: "/assets/cases/saas-turismo/public/landing.webp",
  clientWork: true,
  order: 2,
};
