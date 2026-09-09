# higorlorenzon.dev — portfólio

Site pessoal de Higor Lorenzon. Além de portfólio, é um exercício de
**desenvolvimento orientado por especificações usando IA**: a conversa de
descoberta virou uma spec, a spec guiou a implementação, e cada etapa —
prototipação, código, testes, documentação e revisão — passou por Claude, com a
decisão técnica no meu comando.

O case study [`/cases/este-site`](https://higorlorenzon.vercel.app/cases/este-site)
conta o processo. Este README resume a parte de engenharia.

## Stack

| Camada | Escolha |
| --- | --- |
| Framework | Next.js (App Router), export estático |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS v4 (config em CSS, `@theme`) |
| Conteúdo | MDX versionado no repositório |
| Tipografia | Bricolage Grotesque (display/UI) + Newsreader (leitura longa) (`next/font/google`) |
| Deploy | Vercel + Vercel Analytics |

## Estrutura

```
src/
  app/            rotas (/, /sobre, /cases/[slug]) + layout, fontes, design tokens
  components/     Container, SiteHeader/Footer, CaseCard, CaseBody, Prose, PillarTag
  content/
    cases/<slug>/ meta.ts (CaseMeta tipado) + content.mdx (prosa)
    cases.ts      registro + helpers
    timeline.ts   trajetória de carreira
  i18n/           dicionário pt-BR (esqueleto pronto para en)
  lib/site.ts     identidade, contato, navegação
docs/agents/      convenções para trabalho assistido por IA neste repo
```

Decisões de domínio e glossário: [`CONTEXT.md`](./CONTEXT.md).

## Rodando

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção (checa tipos)
npm run lint
```

## Princípios

- **Um momento de deleite.** Só o hover nos cards de case. O resto fica quieto.
- **NDA por construção.** Projeto de cliente carrega uma flag `ndaSafe` que o
  template respeita — sem nome oficial, sem estratégia de negócio, imagens só de
  áreas públicas.
- **Sem string solta.** Todo texto de interface está em `src/i18n/pt.ts`.
- **Acessibilidade no baseline.** HTML semântico, foco visível, contraste AA,
  `prefers-reduced-motion` respeitado.
