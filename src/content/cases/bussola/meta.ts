import type { CaseMeta } from "@/content/types";

export const meta: CaseMeta = {
  slug: "bussola",
  title: "SaaS de turismo (produto para cliente)",
  tagline:
    "Um produto pago em produção e o provedor externo que respondia 200 OK com o erro escondido no corpo.",
  year: "2025–2026",
  role: "Desenvolvedor frontend (e integração com o backend Node)",
  summary:
    "Produto de turismo com assinatura paga, desenvolvido para um cliente. Atuei no frontend em React e TypeScript e na API em Node. O trabalho que mais rendeu foi descobrir por que as buscas falhavam sem que nenhum monitoramento acusasse.",
  pillars: ["tecnica", "uiux"],
  stack: [
    "Next.js 15",
    "React 19",
    "TypeScript",
    "NestJS",
    "PostgreSQL",
    "Redis",
    "Playwright",
  ],
  cover: "/assets/cases/bussola/cover.svg",
  ndaSafe: true,
  order: 2,
};
