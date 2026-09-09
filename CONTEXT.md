# CONTEXT — personal-website

Portfolio site for Higor Lorenzon — frontend work across React, UI/UX and
product. The site is itself the first proof of taste and craft.

## Glossary

- **Pilar** — one of the three axes the site argues for: `tecnica`, `uiux`,
  `produto`. Every case study and section maps to one or more. Type:
  `src/content/types.ts`.
- **Case study** — a project page under `/cases/<slug>`, structured
  _O problema → O que descobri → O que construí → Resultado_. Metadata is a typed
  `CaseMeta` in `src/content/cases/<slug>/meta.ts`; the prose is a sibling
  `content.mdx`.
- **Meta-case** — the case study about building this site with AI
  (`cases/este-site`). The primary case.
- **Página Processo** — the `/sobre` route. Combines who Higor is, the working
  method (discovery → protótipo → spec → dev com IA → validação), two real
  stories, and a career timeline.
- **Momento de deleite** — the single deliberate micro-interaction of the v1: the
  hover/focus treatment on `CaseCard`. Everything else stays still.
- **ndaSafe** — a `CaseMeta` flag. When `true`, the case template hides repo
  links and only shows imagery from public areas of the client product. Client
  name and business-strategy detail never appear.
- **Dictionary** — all user-facing copy lives in `src/i18n/pt.ts`, keyed for a
  future English locale. Components never hard-code strings.

## Key decisions

- Stack: Next.js (App Router) + TypeScript + Tailwind v4 + MDX. Static export of
  all routes. Deployed on Vercel.
- Light theme only, editorial register. Design tokens in `src/app/globals.css`
  (`@theme`). Fonts: Crimson Pro (display) + Plus Jakarta Sans (body), both via
  next/font/google.
- Content is versioned in-repo as MDX. No CMS.
- Working notes, specs and planning live in `.scratch/` (gitignored). Nothing
  there is published. See `docs/agents/`.

## Out of scope (v1)

Blog, dark mode, elaborate animation, translated i18n, contact form backend,
automated E2E, a 4th case study, custom domain. See `.scratch/portfolio-v1/spec.md`.
