import type { Metadata } from "next";
import Image from "next/image";
import { AnnotatedSection } from "@/components/annotated-section";
import { Container } from "@/components/container";
import { MarginNote } from "@/components/margin-note";
import { timeline } from "@/content/timeline";
import { getDictionary } from "@/i18n";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Como eu trabalho: discovery, protótipo, especificação, desenvolvimento com IA e validação, com exemplos reais.",
};

export default function AboutPage() {
  const t = getDictionary().about;

  return (
    <div className="pt-16">
      {/* Intro — the lead statement, full measure */}
      <Container as="section">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-start">
          <div className="max-w-2xl">
            <h1 className="text-[length:var(--text-h1)] font-semibold tracking-[-0.03em]">
              {t.title}
            </h1>
            <p className="font-reading mt-6 text-lg leading-relaxed text-ink-soft">
              {t.lead}
            </p>
          </div>
          <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-lg border border-line bg-surface md:h-48 md:w-48">
            {/* TODO: substituir por foto real — trocar src por /assets/higor.jpg */}
            <Image
              src="/assets/portrait.svg"
              alt={`Retrato de ${site.name}`}
              fill
              sizes="12rem"
              className="object-cover"
            />
          </div>
        </div>
      </Container>

      {/* Method */}
      <AnnotatedSection
        className="mt-24 border-t border-line pt-16"
        note={
          <MarginNote tag={t.methodNote.tag} sign>
            {t.methodNote.body}
          </MarginNote>
        }
      >
        <h2 className="font-display text-[length:var(--text-h2)] font-semibold tracking-tight">
          {t.methodTitle}
        </h2>
        <p className="mt-4 max-w-2xl text-ink-soft">{t.methodIntro}</p>

        <ol className="mt-12 space-y-10">
          {t.method.map((m, i) => (
            <li key={m.step} className="grid gap-2 md:grid-cols-[10rem_1fr] md:gap-8">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-semibold">{m.step}</span>
              </div>
              <p className="max-w-2xl leading-relaxed text-ink-soft">{m.body}</p>
            </li>
          ))}
        </ol>
      </AnnotatedSection>

      {/* Stories */}
      <AnnotatedSection className="mt-24 border-t border-line pt-16">
        <h2 className="font-display text-[length:var(--text-h2)] font-semibold tracking-tight">
          {t.storiesTitle}
        </h2>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {t.stories.map((s) => (
            <div key={s.place}>
              <h3 className="text-lg font-semibold">{s.place}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{s.body}</p>
            </div>
          ))}
        </div>
      </AnnotatedSection>

      {/* Timeline */}
      <AnnotatedSection className="mt-24 border-t border-line pt-16">
        <h2 className="font-display text-[length:var(--text-h2)] font-semibold tracking-tight">
          {t.timelineTitle}
        </h2>
        <ul className="mt-10 divide-y divide-line border-y border-line">
          {timeline.map((e) => (
            <li
              key={`${e.org}-${e.period}`}
              className="grid gap-1 py-5 md:grid-cols-[9rem_1fr] md:gap-8"
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
  );
}
