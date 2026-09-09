import Image from "next/image";
import Link from "next/link";
import type { CaseMeta } from "@/content/types";
import { PillarTags } from "@/components/pillar-tag";

/**
 * The one deliberate micro-interaction of the v1: on hover / focus the cover
 * zooms and an accent underline sweeps across the title. All of it collapses
 * under prefers-reduced-motion (handled globally in globals.css).
 */
export function CaseCard({ meta }: { meta: CaseMeta }) {
  return (
    <article className="group relative">
      <Link
        href={`/cases/${meta.slug}`}
        className="block focus:outline-none"
        aria-labelledby={`case-${meta.slug}-title`}
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-surface">
          <Image
            src={meta.cover}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-focus-within:scale-[1.04]"
          />
        </div>

        <div className="mt-4">
          <div>
            <p className="text-xs font-medium text-muted">
              {meta.ndaSafe ? "Projeto para cliente, " : ""}
              {meta.year}
            </p>
            <h3
              id={`case-${meta.slug}-title`}
              className="mt-1.5 text-xl font-semibold leading-snug"
            >
              <span className="bg-gradient-to-r from-accent to-accent bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[length:100%_1px] group-focus-within:bg-[length:100%_1px]">
                {meta.title}
              </span>
            </h3>
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-ink-soft">
              {meta.tagline}
            </p>
            <div className="mt-3">
              <PillarTags pillars={meta.pillars} />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
