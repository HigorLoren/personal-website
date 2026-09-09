import type { Metadata } from "next";
import { AnnotatedSection } from "@/components/annotated-section";
import { MarginNote } from "@/components/margin-note";
import { getDictionary } from "@/i18n";
import { site } from "@/lib/site";

const t = getDictionary().contact;

export const metadata: Metadata = {
  title: t.title,
  description: t.lead,
};

/** Each channel as { label, note } in the dictionary; href and display come from site config. */
const channels = [
  { key: "email", href: `mailto:${site.email}`, display: site.email },
  { key: "linkedin", href: site.social.linkedin, display: "linkedin.com/in/higorlorenzon" },
  { key: "github", href: site.social.github, display: "github.com/HigorLoren" },
  { key: "cv", href: site.cvPath, display: t.cvDisplay },
] as const;

export default function ContactPage() {
  return (
    <AnnotatedSection
      className="pb-12 pt-16"
      note={<MarginNote tag={t.note.tag}>{t.note.body}</MarginNote>}
    >
      <h1 className="text-[length:var(--text-h1)] font-semibold tracking-[-0.03em]">
        {t.title}
      </h1>
      <p className="font-reading mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
        {t.lead}
      </p>

      <dl className="mt-12 max-w-3xl border-t border-line">
        {channels.map((c) => (
          <div
            key={c.key}
            className="grid gap-2 border-b border-line py-6 md:grid-cols-[10rem_1fr] md:gap-10"
          >
            <dt className="text-sm font-medium text-muted">{t.channels[c.key].label}</dt>
            <dd>
              <a
                href={c.href}
                className="underline-hand text-lg font-medium text-ink transition-colors hover:text-accent"
                {...(c.key === "email" || c.key === "cv"
                  ? {}
                  : { target: "_blank", rel: "noopener noreferrer" })}
              >
                {c.display}
              </a>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {t.channels[c.key].note}
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </AnnotatedSection>
  );
}
