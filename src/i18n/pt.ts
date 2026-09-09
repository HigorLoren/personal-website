export const pt = {
  meta: {
    titleDefault: "Higor Lorenzon — Desenvolvedor Frontend",
    titleTemplate: "%s — Higor Lorenzon",
    description:
      "Desenvolvedor frontend que une React e TypeScript, cuidado de interface e visão de produto. Participo do discovery, prototipo cedo e uso IA no processo como ferramenta de precisão.",
  },

  nav: {
    skipToContent: "Pular para o conteúdo",
    contact: "Contato",
  },

  home: {
    title: {
      before: "Faço frontend há 8 anos. A parte que rende vem ",
      mark: "antes",
      after: " da primeira tela.",
    },
    intro:
      "Passei por e-commerce de 70 mil usuários por mês, consultoria e empresa grande (IBM, Serasa), produto para o agronegócio e SaaS de assinatura para cliente. Em todos, o gargalo era o mesmo: o que pediram raramente era o que resolvia o problema. Uso IA o dia todo para codar, testar e documentar. Decidir o que construir continua comigo.",
    ctaPrimary: "Ver cases",
    ctaSecondary: "Vamos conversar",
    pillarsTitle: "O que eu faço bem",
    pillars: [
      {
        key: "tecnica",
        title: "Código que aguenta o produto crescer",
        body: "React, TypeScript e Node. Componente reaproveitável, Design System, teste e uma base que não trava quando o produto dobra de tamanho.",
      },
      {
        key: "uiux",
        title: "Interface resolvida antes de virar código",
        body: "O fluxo e o protótipo vêm primeiro, discutidos com quem vai usar. Depois é consistência visual, responsivo de verdade e acessibilidade.",
      },
      {
        key: "produto",
        title: "Problema de negócio traduzido em solução",
        body: "Entro no discovery e nas validações com o cliente. Ajudo a escrever critério de aceite e ajusto rápido a partir do feedback de quem usa.",
      },
    ],
    casesTitle: "Cases",
    casesIntro:
      "Três projetos: um SaaS de produção para cliente, um app que põe IA dentro do produto, e a construção deste site com IA.",
    notes: {
      hero: [
        {
          tag: "rev. 4",
          body: "Tirei daqui três frases que vendiam bem e não diziam nada.",
        },
        {
          tag: "correção",
          body: "Eram 8 anos, não 7. Errei contra mim mesmo.",
        },
      ],
      cases: {
        tag: "nota",
        body: "Três, de propósito. Portfólio com vinte projetos rasos não diz nada.",
      },
    },
  },

  caseSections: {
    problem: "O problema",
    discovery: "O que descobri",
    built: "O que construí",
    outcome: "Resultado",
    stack: "Stack",
    pillars: "Pilares",
    liveLink: "Ver ao vivo",
    repoLink: "Código no GitHub",
    ndaNote:
      "Projeto para cliente. Nome oficial e detalhes de estratégia de negócio omitidos; imagens apenas de áreas públicas do produto.",
    allCases: "Todos os cases",
    next: "Próximo case",
    esteSiteNotes: [
      {
        tag: "rev. 3",
        body: "Terceira versão deste texto. A primeira listava o que eu fiz. Esta conta o que eu decidi.",
      },
      {
        tag: "nota",
        body: "A auditoria também foi com IA. Ela achou erro meu, não o contrário.",
      },
    ],
  },

  about: {
    methodTitle: "Como eu trabalho",
    methodIntro:
      "Prefiro entrar antes do requisito ficar pronto. O trabalho que rende é o que começa antes da tela existir.",
    methodNote: {
      tag: "correção",
      body: "O passo 4 saiu genérico da IA na primeira versão. Reescrevi à mão.",
    },
    method: [
      {
        step: "Discovery",
        body: "Sento com produto e com o cliente para entender a dor real — não a solução que já vieram pedindo. Questiono, faço a pergunta chata, mapeio a jornada.",
      },
      {
        step: "Protótipo",
        body: "Coloco um fluxo navegável na frente das pessoas o quanto antes. É mais barato descobrir que a ideia está errada num protótipo do que num sprint.",
      },
      {
        step: "Especificação",
        body: "Ajudo a transformar o que foi validado em critérios de aceite, regras de negócio e cenários. A spec é curta, mas existe.",
      },
      {
        step: "Desenvolvimento com IA",
        body: "Desenvolvo orientado pela spec, usando Claude e ferramentas similares em todas as etapas: prototipação, código, testes, documentação e revisão. A IA acelera; a decisão técnica é minha.",
      },
      {
        step: "Validação",
        body: "Entrego cedo, coleto feedback de quem usa e itero. O ciclo é curto de propósito.",
      },
    ],
    storiesTitle: "Onde isso apareceu",
    stories: [
      {
        place: "Agência de marketing",
        body: "Meu trabalho era pegar um briefing solto de cliente e devolver um site. Aprendi ali que o briefing quase nunca é o problema: era preciso conversar, entender o negócio do cliente e propor o que ele não sabia pedir. Foi onde a parte de produto começou, antes de eu ter o nome pra isso.",
      },
      {
        place: "Agrosatélite — produto para o agronegócio",
        body: "Trabalhei perto da indústria agronomica e de geoprocessamento. Boa parte do valor estava em entender a rotina de quem ia usar a ferramenta — a dor concreta — e transformar isso em interface que fizesse sentido para esse usuário, não para quem construiu.",
      },
    ],
    timelineTitle: "Trajetória",
  },

  contact: {
    title: "Contato",
    lead:
      "Aberto a conversar sobre frontend, produto e IA aplicada ao desenvolvimento. O e-mail é o caminho mais direto.",
    channels: {
      email: {
        label: "E-mail",
        note: "Para proposta, dúvida ou uma conversa sem compromisso. Mando o currículo em PDF se você pedir.",
        // mostrado enquanto o JS não rodou e com JS desligado (o e-mail só é
        // montado no client para não ir pré-renderizado no HTML)
        fallbackLabel: "Sem JavaScript? Fale comigo pelo LinkedIn",
      },
      linkedin: {
        label: "LinkedIn",
        note: "A trajetória completa, com as datas.",
      },
      github: {
        label: "GitHub",
        note: "Código público, incluindo o deste site.",
      },
    },
    note: {
      tag: "correção",
      body: "Antes o botão de contato abria o e-mail direto. Ficou ruim.",
    },
  },

  footer: {
    ctaTitle: "Vamos conversar",
    ctaBody:
      "Aberto a uma conversa sobre frontend, produto e IA aplicada ao desenvolvimento.",
    emailLabel: "Enviar e-mail",
    emailFallbackLabel: "Sem JavaScript? Fale comigo pelo LinkedIn",
    githubLabel: "GitHub",
    linkedinLabel: "LinkedIn",
    builtWith:
      "Feito com Next.js e TypeScript. Como este site foi construído virou um dos cases.",
    rights: "Higor Lorenzon",
  },
} as const;
