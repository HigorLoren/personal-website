/**
 * Career timeline shown in the "Sobre" section of the home.
 *
 * Dates come from the LinkedIn profile export (2026-09), which is the most
 * precise source available. The first entry stays unnamed on purpose: that
 * employer is also the organisation behind the `bussola` case, which is
 * `ndaSafe` — naming it here would identify the client.
 */
export interface TimelineEntry {
  period: string;
  role: string;
  org: string;
  note?: string;
}

export const timeline: TimelineEntry[] = [
  {
    period: "set 2025 — hoje",
    role: "Engenheiro de software",
    org: "Freelance",
    note: "SaaS de assinatura ponta a ponta: React e Next.js na frente, NestJS e Postgres na API, pagamento recorrente e observabilidade.",
  },
  {
    period: "nov 2023 — mar 2025",
    role: "Analista de desenvolvimento pleno",
    org: "Serasa Experian",
    note: "Plataforma de cálculo de pegada de carbono. Modularizei o monólito, e a cobertura de teste saiu do zero no primeiro mês.",
  },
  {
    period: "set 2022 — nov 2023",
    role: "Analista desenvolvedor pleno",
    org: "Agrosatélite",
    note: "Sustentabilidade agrícola para a Bayer, trabalhando perto de agrônomos. Design System próprio sobre Angular Material. A empresa foi comprada pela Serasa.",
  },
  {
    period: "nov 2021 — set 2022",
    role: "Desenvolvedor fullstack júnior",
    org: "IBM",
    note: "Protótipos com microfrontends para produtos internos de banco, e manutenção de APIs de câmbio em Java.",
  },
  {
    period: "jan 2021 — nov 2021",
    role: "Desenvolvedor fullstack júnior",
    org: "JustForYou",
    note: "E-commerce em React com mais de 70 mil usuários por mês. Performance web e métricas de comportamento junto do time de marketing.",
  },
  {
    period: "jun 2019 — jan 2021",
    role: "Programador júnior",
    org: "Regra Tecnologia",
    note: "ERP para indústria de médio e grande porte. Correção de falha crítica e otimização de consulta SQL.",
  },
  {
    period: "mai 2018 — mai 2019",
    role: "Desenvolvedor web",
    org: "Agência de marketing",
    note: "Primeiro emprego. Briefing de cliente virando site, mais de vinte landing pages. Foi onde montei um Kanban para priorizar as entregas do time.",
  },
];
