import type { Metadata } from "next";
import { AnnotatedSection } from "@/components/annotated-section";
import { EmailLink } from "@/components/email-link";
import { MarginNote } from "@/components/margin-note";
import { getDictionary } from "@/i18n";
import { site } from "@/lib/site";

const t = getDictionary().contact;

export const metadata: Metadata = {
  title: t.title,
  description: t.lead,
};

const linkClass =
  "underline-hand text-lg font-medium text-ink transition-colors hover:text-accent";

/** e-mail is rendered apart (see EmailLink — never pre-rendered into the HTML). */
const channels = [
  { key: "linkedin", href: site.social.linkedin, display: "linkedin.com/in/higorlorenzon" },
  { key: "github", href: site.social.github, display: "github.com/HigorLoren" },
  { key: "cv", href: site.cvPath, display: t.cvDisplay },
] as const;

export default function ContactPage() {
  return (
    <AnnotatedSection
      className="pb-20 pt-16"
      note={<MarginNote tag={t.note.tag}>{t.note.body}</MarginNote>}
    >
      <h1 className="text-[length:var(--text-h1)] font-semibold tracking-[-0.03em]">
        {t.title}
      </h1>
      <p className="font-reading mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
        {t.lead}
      </p>

      <dl className="mt-12 max-w-3xl border-t border-line">
        <div className="grid gap-2 border-b border-line py-6 md:grid-cols-[10rem_1fr] md:gap-10">
          <dt className="text-sm font-medium text-muted">{t.channels.email.label}</dt>
          <dd>
            <EmailLink
              encoded={site.emailEncoded}
              fallbackHref={site.social.linkedin}
              fallbackLabel={t.channels.email.fallbackLabel}
              className={linkClass}
            />
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {t.channels.email.note}
            </p>
          </dd>
        </div>

        {channels.map((c) => (
          <div
            key={c.key}
            className="grid gap-2 border-b border-line py-6 md:grid-cols-[10rem_1fr] md:gap-10"
          >
            <dt className="text-sm font-medium text-muted">{t.channels[c.key].label}</dt>
            <dd>
              <a
                href={c.href}
                className={linkClass}
                {...(c.key === "cv"
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
