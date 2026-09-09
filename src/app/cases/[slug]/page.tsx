import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnnotatedSection } from "@/components/annotated-section";
import { MarginNote } from "@/components/margin-note";
import { Prose } from "@/components/prose";
import { PillarTags } from "@/components/pillar-tag";
import { CaseBody, hasCaseBody } from "@/components/case-body";
import { cases, getAdjacentCase, getCase } from "@/content/cases";
import { getDictionary } from "@/i18n";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  props: PageProps<"/cases/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const meta = getCase(slug);
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.summary,
    openGraph: { title: meta.title, description: meta.summary },
  };
}

export default async function CasePage(props: PageProps<"/cases/[slug]">) {
  const { slug } = await props.params;
  const meta = getCase(slug);
  if (!meta || !hasCaseBody(slug)) notFound();

  const t = getDictionary().caseSections;
  const next = getAdjacentCase(slug);

  return (
    <article className="pt-16">
      <AnnotatedSection>
        <Link
          href="/#cases"
          className="text-sm text-muted transition-colors hover:text-ink"
        >
          ← {t.allCases}
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="text-sm text-muted">
            {meta.role}, {meta.year}
          </p>
          <h1 className="mt-4 text-[length:var(--text-h1)] font-semibold leading-[1.05] tracking-[-0.03em]">
            {meta.title}
          </h1>
          <p className="font-reading mt-6 text-lg leading-relaxed text-ink-soft">
            {meta.summary}
          </p>
        </header>

        {/* Meta strip */}
        <dl className="mt-10 grid gap-6 border-y border-line py-6 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium text-muted">
              {t.stack}
            </dt>
            <dd className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-sm text-ink-soft">
              {meta.stack.map((s, i) => (
                <span key={s}>
                  {s}
                  {i < meta.stack.length - 1 ? "," : ""}
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-muted">
              {t.pillars}
            </dt>
            <dd className="mt-2">
              <PillarTags pillars={meta.pillars} />
            </dd>
          </div>
        </dl>

        {(meta.liveUrl || meta.repoUrl) && !meta.ndaSafe && (
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            {meta.liveUrl && (
              <Link
                href={meta.liveUrl}
                className="underline-hand text-ink transition-colors hover:text-accent"
              >
                {t.liveLink}
              </Link>
            )}
            {meta.repoUrl && (
              <Link
                href={meta.repoUrl}
                className="underline-hand text-ink transition-colors hover:text-accent"
              >
                {t.repoLink}
              </Link>
            )}
          </div>
        )}
      </AnnotatedSection>

      {/* Cover */}
      <AnnotatedSection className="mt-12">
        <div className="relative h-52 max-w-3xl overflow-hidden rounded-lg border border-line bg-surface sm:h-64 md:h-72">
          <Image
            src={meta.cover}
            alt={`Imagem de capa — ${meta.title}`}
            fill
            sizes="(min-width: 1024px) 48rem, 100vw"
            className="object-cover"
            priority
          />
        </div>
        {meta.ndaSafe && (
          <p className="mt-3 text-xs text-muted">{t.ndaNote}</p>
        )}
      </AnnotatedSection>

      {/* Body */}
      {slug === "este-site" ? (
        <AnnotatedSection
          className="mt-16"
          note={
            <div className="flex flex-col lg:gap-6">
              <MarginNote tag={t.esteSiteNotes[0].tag}>
                {t.esteSiteNotes[0].body}
              </MarginNote>
              <MarginNote tag={t.esteSiteNotes[1].tag}>
                {t.esteSiteNotes[1].body}
              </MarginNote>
            </div>
          }
        >
          <Prose>
            <CaseBody slug={slug} />
          </Prose>
        </AnnotatedSection>
      ) : (
        <AnnotatedSection className="mt-16">
          <Prose>
            <CaseBody slug={slug} />
          </Prose>
        </AnnotatedSection>
      )}

      {/* Next */}
      {next && (
        <AnnotatedSection className="mt-24 border-t border-line pb-20 pt-10">
          <p className="text-sm text-muted">{t.next}</p>
          <Link
            href={`/cases/${next.slug}`}
            className="mt-2 inline-block font-display text-2xl font-semibold tracking-tight transition-colors hover:text-accent"
          >
            {next.title}
          </Link>
        </AnnotatedSection>
      )}
    </article>
  );
}
