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
- **Página Contato** — the `/contato` route: e-mail, LinkedIn, GitHub and the
  CV as a list with one honest line each. Header "Contato" and the home's
  secondary CTA point here instead of opening a mailto directly.
- **Nota de margem** (`MarginNote`) — an aside in Higor's own voice: remark in
  handwriting (Caveat, revision-red) + a short printed tag (`rev. 4`, `nota`,
  `correção`) as the margin mark. No signature. Sits in the left
  margin of an `AnnotatedSection` on desktop; on mobile it comes *before* the
  section content. The site marking up its own draft — the one memorable device.
  Home, `/sobre`, and the meta-case (`/cases/este-site`, two stacked). Copy in
  `src/i18n/pt.ts`.
- **Marcação de caneta** (`PenMark`) — the one moving element of the hero: a
  revision-red underline in two hand-drawn passes, drawn on load under the word
  `antes` in the h1 (SVG `stroke-dashoffset`, pure CSS) and drifting a few
  pixels with cursor and scroll. Static under `prefers-reduced-motion`. Same
  gesture as the margin notes: the site grifando its own draft. Home only.
- **AnnotatedSection** — page-section wrapper giving the two-track layout: wide
  left margin (for a `MarginNote`) + main content column. Content always sits in
  column 2 so the body edge stays aligned across sections.
- **ndaSafe** — a `CaseMeta` flag. When `true`, the case template hides repo
  links and only shows imagery from public areas of the client product. Client
  name and business-strategy detail never appear.
- **Dictionary** — all user-facing copy lives in `src/i18n/pt.ts`, keyed for a
  future English locale. Components never hard-code strings.

## Key decisions

Architecture decisions with real trade-offs are recorded in `docs/adr/`.

- Stack: Next.js (App Router) + TypeScript + Tailwind v4 + MDX. All routes
  statically prerendered (SSG). Deployed on Vercel. See ADR-0001.
- Light theme only, editorial register ("rascunho de trabalho"): cool paper,
  true-black ink, one marking-pen red used only for annotations/corrections/
  active nav. Design tokens in `src/app/globals.css` (`@theme`). Fonts:
  Bricolage Grotesque (display/UI) + Newsreader (long-form reading) + Caveat
  (handwriting, `MarginNote` only), all via next/font/google.
- Content is versioned in-repo as MDX. No CMS. See ADR-0002.
- All user-facing copy is keyed in `src/i18n/pt.ts`; only pt-BR ships. See
  ADR-0003.
- `ndaSafe` governs how client work appears in this public repo. See ADR-0004.
- Branch strategy: work lands on `dev`; `main` is only merged when a production
  deploy on Vercel is wanted.
- Working notes, specs and planning live in `.scratch/` (gitignored). Nothing
  there is published. See `docs/agents/`.

## Out of scope (v1)

Blog, dark mode, elaborate animation, translated i18n, contact form backend,
automated E2E, a 4th case study, custom domain. See `.scratch/portfolio-v1/spec.md`.

## Session state (2026-09-09)

**Current task** — Content pass over the case studies. Card Finder now describes
the in-house identification service (`~/workspace/ditto-card-scanner`), merged
into `dev` as `96c8899`. Nothing has gone to `main`.

**Key decisions**

- The case credits the in-house vision pipeline. Gemini is the fallback the app
  uses when the service fails its health check, not the identifier.
- Published numbers are absolute counts (19 of 21 photos, a 20.324-card catalog)
  so the sample size travels with the claim instead of hiding behind a rate.
- Implementation trivia stays out of case copy: error taxonomy, internal
  fallbacks, exact thresholds and resize dimensions were all cut.

**Next steps**

- P1c — the `este-site` meta-case still needs the real numbers (3h09 to live,
  ~32 human prompts), the redesign arc, and the invisible-CTA bug. Spec:
  `.scratch/portfolio-v1/research/03-este-site.md` §6.
- Waiting on Higor: real portrait, case screenshots, Card Finder cover, repo and
  live URLs, plus the Lighthouse and keyboard passes nobody has run.
- Never proposed to him: the 11-step working protocol in
  `.scratch/portfolio-v1/research/04-processo-ia.md` §3.4 as `/sobre` content.
