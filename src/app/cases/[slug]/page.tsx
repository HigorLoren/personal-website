import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
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
      <Container>
        <Link
          href="/#cases"
          className="text-sm text-muted transition-colors hover:text-ink"
        >
          ← {t.allCases}
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            {meta.year} · {meta.role}
          </p>
          <h1 className="mt-4 text-[length:var(--text-h1)] font-semibold leading-[1.05] tracking-[-0.03em]">
            {meta.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            {meta.summary}
          </p>
        </header>

        {/* Meta strip */}
        <dl className="mt-10 grid gap-6 border-y border-line py-6 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase tracking-widest text-muted">
              {t.stack}
            </dt>
            <dd className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-sm text-ink-soft">
              {meta.stack.map((s, i) => (
                <span key={s}>
                  {s}
                  {i < meta.stack.length - 1 ? " ·" : ""}
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-widest text-muted">
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
                className="border-b border-accent pb-0.5 text-ink transition-colors hover:text-accent"
              >
                {t.liveLink} ↗
              </Link>
            )}
            {meta.repoUrl && (
              <Link
                href={meta.repoUrl}
                className="border-b border-accent pb-0.5 text-ink transition-colors hover:text-accent"
              >
                {t.repoLink} ↗
              </Link>
            )}
          </div>
        )}
      </Container>

      {/* Cover */}
      <Container className="mt-12">
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-surface sm:aspect-[2/1]">
          <Image
            src={meta.cover}
            alt={`Imagem de capa — ${meta.title}`}
            fill
            sizes="(min-width: 1024px) 64rem, 100vw"
            className="object-cover"
            priority
          />
        </div>
        {meta.ndaSafe && (
          <p className="mt-3 text-xs text-muted">{t.ndaNote}</p>
        )}
      </Container>

      {/* Body */}
      <Container className="mt-16">
        <Prose>
          <CaseBody slug={slug} />
        </Prose>
      </Container>

      {/* Next */}
      {next && (
        <Container className="mt-24 border-t border-line pt-10">
          <p className="text-xs font-medium uppercase tracking-widest text-muted">
            {t.next}
          </p>
          <Link
            href={`/cases/${next.slug}`}
            className="group mt-2 inline-flex items-baseline gap-3 font-display text-2xl font-semibold tracking-tight transition-colors hover:text-accent"
          >
            {next.title}
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Container>
      )}
    </article>
  );
}
