/**
 * Career timeline shown on /sobre.
 */
export interface TimelineEntry {
  period: string;
  role: string;
  org: string;
  note?: string;
}

export const timeline: TimelineEntry[] = [
  {
    period: "hoje",
    role: "Desenvolvedor Frontend",
    org: "Freelance",
    note: "Produtos SaaS para clientes: React/Next no frontend, integração com serviços em Node, Design System e testes.",
  },
  {
    period: "2022 — 2023",
    role: "Desenvolvedor Frontend Pleno",
    org: "Serasa Experian",
    note: "Frontend em produto de grande escala.",
  },
  {
    period: "2021 — 2022",
    role: "Desenvolvedor",
    org: "IBM",
    note: "Consultoria e desenvolvimento.",
  },
  {
    period: "2019 — 2021",
    role: "Desenvolvedor Frontend Pleno",
    org: "Agrosatélite",
    note: "Produto para o agronegócio: interface sobre dados de satélite, perto de agrônomos.",
  },
  {
    period: "2018 — 2019",
    role: "Desenvolvedor Web",
    org: "Agência de marketing",
    note: "Primeiro emprego. Do briefing do cliente ao site entregue.",
  },
];
