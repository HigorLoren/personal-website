"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getDictionary } from "@/i18n";
import { SECTION_HASH_EVENT } from "@/lib/section-hash";
import { contactHref, nav } from "@/lib/site";

/**
 * Main navigation. Client-side so it can mark the active entry: the section
 * links light up as <ScrollHashObserver> rewrites the URL hash on scroll, and
 * "Início" lights up once the reader is back above every section (hash cleared).
 * The active marker is the same hand-drawn underline used elsewhere on the site;
 * the Contato CTA keeps its own treatment (a pen loop, `.circle-hand`).
 */
export function SiteNav() {
  const t = getDictionary().nav;
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const read = () => setHash(window.location.hash);
    read();
    window.addEventListener("hashchange", read);
    window.addEventListener(SECTION_HASH_EVENT, read);
    return () => {
      window.removeEventListener("hashchange", read);
      window.removeEventListener(SECTION_HASH_EVENT, read);
    };
  }, [pathname]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/" && hash === href.slice(1);
    if (href === "/") return pathname === "/" && hash === "";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav aria-label="Principal">
      <ul className="flex items-center gap-4 text-sm sm:gap-6">
        {nav.map((item) => {
          const active = isActive(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "underline-hand text-ink"
                    : "text-muted transition-colors hover:text-ink"
                }
              >
                {item.label}
              </Link>
            </li>
          );
        })}
        <li>
          <Link
            href={contactHref}
            aria-current={isActive(contactHref) ? "page" : undefined}
            className="circle-hand text-ink transition-colors hover:text-accent"
          >
            {t.contact}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
