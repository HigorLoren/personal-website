import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { contactHref, nav, site } from "@/lib/site";
import { getDictionary } from "@/i18n";

export function SiteHeader() {
  const t = getDictionary().nav;

  return (
    <header className="border-b border-line bg-paper">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 whitespace-nowrap font-display text-base font-semibold tracking-tight sm:text-lg"
        >
          <Image
            src="/assets/profile_avatar.webp"
            alt=""
            width={28}
            height={28}
            className="size-7 rounded-full border border-line"
            priority
          />
          {site.name}
        </Link>
        <nav aria-label="Principal">
          <ul className="flex items-center gap-4 text-sm sm:gap-6">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={contactHref}
                className="underline-hand text-ink transition-colors hover:text-accent"
              >
                {t.contact}
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
