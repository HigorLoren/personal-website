import Image from "next/image";
import Link from "next/link";
import { AnnotatedSection } from "@/components/annotated-section";
import { CaseCard } from "@/components/case-card";
import { MarginNote } from "@/components/margin-note";
import { PenMark } from "@/components/pen-mark";
import { ScrollHashObserver } from "@/components/scroll-hash-observer";
import { cases } from "@/content/cases";
import { timeline } from "@/content/timeline";
import { getDictionary } from "@/i18n";
import { contactHref, site } from "@/lib/site";

export default function HomePage() {
  const dict = getDictionary();
  const t = dict.home;
  const a = dict.about;

  return (
    <>
      <ScrollHashObserver />

      {/* Hero */}
      <AnnotatedSection
        className="pb-12 pt-10 md:pt-15"
        note={
          <MarginNote tag={t.notes.hero[0].tag}>
            {t.notes.hero[0].body}
          </MarginNote>
        }
      >
        <h1 className="max-w-4xl text-[length:var(--text-hero)] text-[color:var(--color-ink-soft)] font-bold leading-[1.05] tracking-[-0.015em]">
          <span className="text-[color:var(--color-ink)]">{t.title.strong}</span><br/>
          {t.title.before}
          <PenMark>{t.title.mark}</PenMark>
          {t.title.after}
        </h1>
        <p className="font-reading mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">
          {t.intro}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href="#cases"
            className="rounded-none bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
          >
            {t.ctaPrimary}
          </Link>
          <Link
            href={contactHref}
            className="tap-area text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            {t.ctaSecondary}
          </Link>
        </div>
      </AnnotatedSection>

      {/* O que eu faço bem — a darker sheet on the desk */}
      <div className="border-y border-line bg-surface">
        <AnnotatedSection
          className="py-16"
          note={
            <MarginNote tag={t.notes.pillars.tag}>
              {t.notes.pillars.body}
            </MarginNote>
          }
        >
          <h2 className="font-display text-sm font-medium text-muted">
            {t.pillarsTitle}
          </h2>
          <dl className="mt-8 max-w-3xl divide-y divide-line">
            {t.pillars.map((p) => (
              <div
                key={p.key}
                className="grid gap-2 py-7 first:pt-0 last:pb-0 md:grid-cols-[16rem_1fr] md:gap-10"
              >
                <dt className="text-lg font-semibold leading-snug">
                  {p.title}
                </dt>
                <dd className="leading-relaxed text-ink-soft">{p.body}</dd>
              </div>
            ))}
          </dl>
        </AnnotatedSection>
      </div>

      {/* Cases */}
      <AnnotatedSection id="cases" className="scroll-mt-20 py-20">
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

      {/* Sobre — a second darker sheet: method, stories, timeline */}
      <div id="sobre" className="scroll-mt-20 border-t border-line">
        <div className="bg-surface py-20">
          <AnnotatedSection
            note={
              <div className="flex flex-col gap-6">
                <div className="relative aspect-square w-28 overflow-hidden rounded-full border border-line bg-surface lg:w-36">
                  <Image
                    src="/assets/foto.webp"
                    alt={`Retrato de ${site.name}`}
                    fill
                    sizes="12rem"
                    className="object-cover"
                  />
                </div>
                {a.methodNotes.map((n) => (
                  <MarginNote key={n.tag} tag={n.tag}>
                    {n.body}
                  </MarginNote>
                ))}
              </div>
            }
          >
            <h2 className="font-display text-[length:var(--text-h2)] font-semibold tracking-tight">
              {a.methodTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-ink-soft">{a.methodIntro}</p>

            <ol className="mt-12 space-y-10">
              {a.method.map((m, i) => (
                <li
                  key={m.step}
                  className="grid gap-2 md:grid-cols-[10rem_1fr] md:gap-8"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-sm text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-semibold">{m.step}</span>
                  </div>
                  <p className="max-w-2xl leading-relaxed text-ink-soft">
                    {m.body}
                  </p>
                </li>
              ))}
            </ol>
          </AnnotatedSection>

          {/* Onde isso apareceu */}
          <div className="pt-20">
            <AnnotatedSection>
              <h2 className="font-display text-[length:var(--text-h2)] font-semibold tracking-tight">
                {a.storiesTitle}
              </h2>
              <div className="mt-10 grid gap-10 md:grid-cols-2">
                {a.stories.map((s) => (
                  <div key={s.place}>
                    <h3 className="text-lg font-semibold">{s.place}</h3>
                    <p className="mt-3 leading-relaxed text-ink-soft">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
            </AnnotatedSection>
          </div>
        </div>

        {/* Trajetória */}
        <div className="border-t border-line py-20">
          <AnnotatedSection
            note={
              <MarginNote tag={a.timelineNote.tag}>
                {a.timelineNote.body}
              </MarginNote>
            }
          >
            <h2 className="font-display text-[length:var(--text-h2)] font-semibold tracking-tight">
              {a.timelineTitle}
            </h2>
            <ul className="mt-10 divide-y divide-line">
              {timeline.map((e) => (
                <li
                  key={`${e.org}-${e.period}`}
                  className="grid gap-1 py-5 first:pt-0 last:pb-0 md:grid-cols-[9rem_1fr] md:gap-8"
                >
                  <span className="text-sm text-muted">{e.period}</span>
                  <div>
                    <p className="font-medium">
                      {e.role}, <span className="text-ink-soft">{e.org}</span>
                    </p>
                    {e.note && (
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {e.note}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </AnnotatedSection>
        </div>
      </div>
    </>
  );
}
