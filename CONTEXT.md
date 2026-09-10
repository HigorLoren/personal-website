# CONTEXT — personal-website

Portfolio site for Higor Lorenzon — frontend work across React, UI/UX and product.
The site is itself the first proof of taste and craft.

## Glossary

- **Pilar** — one of the three axes the site argues for: `tecnica`, `uiux`, `produto`.
  Every case study and section maps to one or more.
  Type: `src/content/types.ts`.
- **Case study** — a project page under `/cases/<slug>`, structured _O problema → O que descobri → O que construí → Resultado_.
  Metadata is a typed `CaseMeta` in `src/content/cases/<slug>/meta.ts`; the prose is a sibling `content.mdx`.
- **Meta-case** — the case study about building this site with AI (`cases/este-site`).
  The primary case.
- **Seção Sobre** — the `/#sobre` anchor on the home (the `/sobre` route redirects there).
- **Página Contato** — the `/contato` route: e-mail, LinkedIn and GitHub as a list.
- **`<EmailLink>`** — client component for the contact e-mail.
  The address is a disposable alias stored base64-encoded in `site.emailEncoded` and decoded only in the browser, so the served HTML (public repo, SSG) carries no plaintext address or `mailto:`. See `docs/privacy.md`.
- **Nota de margem** (`MarginNote`) — an aside in Higor's own voice: remark in handwriting style + a short printed tag (E.g.: `v4`, `nota`, `correção`) as the margin mark.
  Sits in the left margin of an `AnnotatedSection` on desktop; on mobile it comes _before_ the section content.
  The site marking up its own draft — the one memorable device.
- **Marcação de caneta** (`PenMark`) — the moving element of the hero: a revision-red underline in two hand-drawn passes, drawn on load (SVG `stroke-dashoffset`, pure CSS) and drifting a few pixels with cursor and scroll. Same gesture as the margin notes: the site grifando its own draft.
- **AnnotatedSection** — page-section wrapper giving the two-track layout: wide left margin (for a `MarginNote`) + main content column.
  Content always sits in column 2 so the body edge stays aligned across sections.
- **`<ScrollHashObserver>`** — client component on the home only.
  An `IntersectionObserver` keeps the URL hash in sync with the section actually in view: scrolling into `#cases` / `#sobre` writes the hash (via `replaceState`, no history entry, no scroll jump), scrolling back above every section clears it.
  It emits a `sectionhashchange` event (`src/lib/section-hash.ts`) that `<SiteNav>` listens to.
- **`<SiteNav>`** — the main nav, client-side so it can mark the entry for the section in view.
  Active section link gets the hand-drawn underline (`.underline-hand`, the same red pen); "Início" lights up once the hash is cleared.
  The Contato CTA keeps its own mark: a pen loop scribbled around the word (`.circle-hand`, token `--circle-hand-stroke`).
- **ndaSafe** — a `CaseMeta` flag.
  When `true`, the case template hides repo links and only shows imagery from public areas of the client product.
  Client name and business-strategy detail never appear.
- **Dictionary** — all user-facing copy lives in `src/i18n/pt.ts`, keyed for a future English locale.

## Key decisions

Architecture decisions with real trade-offs are recorded in `docs/adr/`.

- Stack: Next.js (App Router) + TypeScript + Tailwind v4 + MDX.
  All routes statically prerendered (SSG).
  Deployed on Vercel.
  See ADR-0001.
- Light theme only, editorial register ("rascunho de trabalho"): cool paper, true-black ink, one marking-pen red used only for annotations, corrections and the active nav marker.
  Design tokens in `src/app/globals.css` (`@theme`).
  Fonts: Bricolage Grotesque (display/UI) + Newsreader (long-form reading) + Caveat (handwriting, `MarginNote` only), all via next/font/google.
- Home nav reflects scroll position: `<ScrollHashObserver>` syncs the URL hash to the section in view and `<SiteNav>` marks that link.
  The active marker is the hand underline, so the Contato CTA moved to its own mark (`.circle-hand`, a pen loop).
- Content is versioned in-repo as MDX.
  No CMS.
  See ADR-0002.
- All user-facing copy is keyed in `src/i18n/pt.ts`; only pt-BR ships.
  See ADR-0003.
- `ndaSafe` governs how client work appears in this public repo.
  See ADR-0004.
- Every published claim needs a verifiable source; corrections are shown as margin notes on the page where the error was.
  See ADR-0006.
- Personal contact data in this public SSG repo: e-mail is a disposable alias; no CV PDF (it carried personal phone/e-mail).
  See ADR-0007.
- Branch strategy: work lands on `dev`; `main` is only merged when a production deploy on Vercel is wanted.
- Working notes, specs and planning live in `.scratch/` (gitignored).
  Nothing there is published.
  See `docs/agents/`.
- Public repo: a pre-commit guard (`scripts/precommit-privacy.mjs`, activated by `npm run hooks:install`) blocks new raw e-mails, phone numbers, CPF and image GPS/EXIF.
  Threat model and manual checklist in `docs/privacy.md`.
