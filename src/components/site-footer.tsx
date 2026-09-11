import Link from "next/link";
import { Container } from "@/components/container";
import { EmailLink } from "@/components/email-link";
import { site } from "@/lib/site";
import { getDictionary } from "@/i18n";

const BUILD_YEAR = 2026;

/**
 * Two 44px rows do not fit in the 50px this stack used to occupy, so on touch
 * the second link does move down. Gated on `any-pointer` so a mouse-only
 * reader keeps the tighter original rhythm. No pen is pinned to these boxes,
 * so here the height can come from the box itself rather than `.tap-area`.
 */
const socialLinkClass =
  "text-muted transition-colors hover:text-ink any-pointer-coarse:inline-flex any-pointer-coarse:min-h-11 any-pointer-coarse:items-center";

export function SiteFooter() {
  const t = getDictionary().footer;

  return (
    <footer
      id="contato"
      className="border-t border-line py-16 scroll-mt-24 bg-surface"
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
              className="underline-hand underline-hand-2 tap-area mt-5 inline-block text-lg text-ink transition-colors hover:text-accent"
            />
          </div>

          {/* -my-3 gives back the slack the 44px rows add at either end */}
          <nav
            aria-label="Links"
            className="flex flex-col gap-2.5 text-sm any-pointer-coarse:-my-3 any-pointer-coarse:gap-0 md:items-end"
          >
            <Link href={site.social.github} className={socialLinkClass}>
              {t.githubLabel}
            </Link>
            <Link href={site.social.linkedin} className={socialLinkClass}>
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
