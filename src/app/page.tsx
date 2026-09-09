import Link from "next/link";
import { AnnotatedSection } from "@/components/annotated-section";
import { CaseCard } from "@/components/case-card";
import { MarginNote } from "@/components/margin-note";
import { cases } from "@/content/cases";
import { getDictionary } from "@/i18n";
import { site } from "@/lib/site";

export default function HomePage() {
  const t = getDictionary().home;

  return (
    <>
      {/* Hero */}
      <AnnotatedSection
        className="pb-12 pt-10 md:pt-15"
        note={
          <MarginNote date={t.notes.hero.date}>{t.notes.hero.body}</MarginNote>
        }
      >
        <h1 className="max-w-4xl text-[length:var(--text-hero)] font-bold leading-[1.05] tracking-[-0.015em]">
          {t.title}
        </h1>
        <p className="font-reading mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">
          {t.intro}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={`mailto:${site.email}`}
            className="rounded-none bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
          >
            {t.ctaPrimary}
          </a>
          <Link
            href="#cases"
            className="text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            {t.ctaSecondary}
          </Link>
        </div>
      </AnnotatedSection>

      {/* O que eu faço bem */}
      <AnnotatedSection className="border-t border-line pb-20 pt-14">
        <h2 className="font-display text-sm font-medium text-muted">
          {t.pillarsTitle}
        </h2>
        <dl className="mt-8 max-w-3xl border-t border-line">
          {t.pillars.map((p) => (
            <div
              key={p.key}
              className="grid gap-2 border-b border-line py-7 md:grid-cols-[16rem_1fr] md:gap-10"
            >
              <dt className="text-lg font-semibold leading-snug">{p.title}</dt>
              <dd className="leading-relaxed text-ink-soft">{p.body}</dd>
            </div>
          ))}
        </dl>
      </AnnotatedSection>

      {/* Cases */}
      <AnnotatedSection
        id="cases"
        className="scroll-mt-20 border-t border-line py-20"
        note={
          <MarginNote date={t.notes.cases.date}>{t.notes.cases.body}</MarginNote>
        }
      >
        <div className="max-w-2xl">
          <h2 className="font-display text-[length:var(--text-h2)] font-semibold tracking-tight">
            {t.casesTitle}
          </h2>
          <p className="mt-4 text-ink-soft">{t.casesIntro}</p>
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {cases.map((meta) => (
            <CaseCard key={meta.slug} meta={meta} />
          ))}
        </div>
      </AnnotatedSection>
    </>
  );
}
