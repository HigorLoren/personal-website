import Link from "next/link";
import { Container } from "@/components/container";
import { EmailLink } from "@/components/email-link";
import { site } from "@/lib/site";
import { getDictionary } from "@/i18n";

const BUILD_YEAR = 2026;

export function SiteFooter() {
  const t = getDictionary().footer;

  return (
    <footer
      id="contato"
      className="border-t border-line py-16 scroll-mt-24"
    >
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              {t.ctaTitle}
            </h2>
            <p className="mt-3 max-w-md text-ink-soft">{t.ctaBody}</p>
            <EmailLink
              encoded={site.emailEncoded}
              fallbackHref={site.social.linkedin}
              fallbackLabel={t.emailFallbackLabel}
              className="underline-hand underline-hand-2 mt-5 inline-block text-lg text-ink transition-colors hover:text-accent"
            />
          </div>

          <nav aria-label="Links" className="flex flex-col gap-2.5 text-sm md:items-end">
            <Link
              href={site.social.github}
              className="text-muted transition-colors hover:text-ink"
            >
              {t.githubLabel}
            </Link>
            <Link
              href={site.social.linkedin}
              className="text-muted transition-colors hover:text-ink"
            >
              {t.linkedinLabel}
            </Link>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-1 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{t.builtWith}</p>
          <p>
            © {BUILD_YEAR} {t.rights}
          </p>
        </div>
      </Container>
    </footer>
  );
}
