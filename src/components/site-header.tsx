import Link from "next/link";
import { Container } from "@/components/container";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-paper">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="whitespace-nowrap font-display text-base font-semibold tracking-tight sm:text-lg"
        >
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
                href={`mailto:${site.email}`}
                className="border-b border-accent pb-0.5 text-ink transition-colors hover:text-accent"
              >
                Contato
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
