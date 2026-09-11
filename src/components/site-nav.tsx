"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { getDictionary } from "@/i18n";
import { SECTION_HASH_EVENT } from "@/lib/section-hash";
import { contactHref, nav, sectionAnchor } from "@/lib/site";

/**
 * Main navigation. Client-side for two reasons:
 *  - it marks the entry for the section in view (the hash <ScrollHashObserver>
 *    keeps in sync; "Início" once the reader is back above every section);
 *  - one hand-drawn underline is shared by the whole nav. It rests under the
 *    active entry and slides to follow the pointer onto a hovered item, drawing
 *    itself in the first time it appears. Positioning lives here (measure the
 *    target link); the motion is CSS (`.nav-underline` in globals.css).
 *
 * Hover is tracked on the <ul>, not per link: moving across the gap between two
 * links keeps the last one hovered (no snap back to the active entry). The reset
 * is debounced — 90ms after the pointer leaves the nav, or 450ms once it lingers
 * inside the nav but off every item.
 *
 * Every item is styled the same; Contato only differs by weight, as the CTA.
 */
export function SiteNav() {
  const t = getDictionary().nav;
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);
  // Stays false through the first (server-matching) render, so the underline
  // isn't placed under "Início" only to slide to the real section post-mount
  // on a direct `/#sobre` load. It appears once, already in the right spot.
  const [ready, setReady] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const leaveTimer = useRef<number | undefined>(undefined);
  const idleTimer = useRef<number | undefined>(undefined);
  const [mark, setMark] = useState({
    left: 0,
    width: 0,
    hidden: true,
    drawKey: 0,
  });

  const clearTimers = () => {
    window.clearTimeout(leaveTimer.current);
    window.clearTimeout(idleTimer.current);
  };

  // Fires on entry to the <ul> and on every boundary crossing within it (a link
  // edge, the gap between links). On a link: follow it. Off every item: keep the
  // current one, but reset to the active entry if the pointer lingers.
  const onPointerActivity = (e: MouseEvent<HTMLUListElement>) => {
    const link = (e.target as HTMLElement).closest<HTMLElement>("[data-nav]");
    clearTimers();
    if (link) {
      setHovered(link.dataset.nav ?? null);
      return;
    }
    idleTimer.current = window.setTimeout(() => setHovered(null), 450);
  };

  const onPointerLeave = () => {
    clearTimers();
    leaveTimer.current = window.setTimeout(() => setHovered(null), 90);
  };

  useEffect(
    () => () => {
      window.clearTimeout(leaveTimer.current);
      window.clearTimeout(idleTimer.current);
    },
    [],
  );

  useEffect(() => {
    const read = () => {
      setHash(window.location.hash);
      setReady(true); // first read done — safe to place the underline now
    };
    read();
    window.addEventListener("hashchange", read);
    window.addEventListener(SECTION_HASH_EVENT, read);
    return () => {
      window.removeEventListener("hashchange", read);
      window.removeEventListener(SECTION_HASH_EVENT, read);
    };
  }, [pathname]);

  const isActive = useCallback(
    (href: string) => {
      const anchor = sectionAnchor(href);
      if (anchor !== null) return pathname === "/" && hash === `#${anchor}`;
      if (href === "/") return pathname === "/" && hash === "";
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname, hash],
  );

  // `page` only for the real current route; a section anchor points to a spot
  // within the page the reader is already on, so that's `location`.
  const ariaCurrent = useCallback(
    (href: string): "page" | "location" | undefined => {
      if (!isActive(href)) return undefined;
      return sectionAnchor(href) !== null ? "location" : "page";
    },
    [isActive],
  );

  const activeHref =
    [...nav, { href: contactHref }].find((i) => isActive(i.href))?.href ?? null;
  const targetHref = ready ? (hovered ?? activeHref) : null;

  const place = useCallback(() => {
    const root = navRef.current;
    if (!root) return;
    const el = targetHref
      ? root.querySelector<HTMLElement>(`[data-nav="${targetHref}"]`)
      : null;
    if (!el) {
      setMark((m) => (m.hidden ? m : { ...m, hidden: true }));
      return;
    }
    const rootBox = root.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    setMark((m) => ({
      left: box.left - rootBox.left,
      width: box.width,
      hidden: false,
      drawKey: m.hidden ? m.drawKey + 1 : m.drawKey,
    }));
  }, [targetHref]);

  // Re-measure whenever the target changes, and keep a live handle for the
  // resize / font-load listeners below (which are bound once).
  const placeRef = useRef(place);
  useEffect(() => {
    placeRef.current = place;
    place();
  }, [place]);

  useEffect(() => {
    const remeasure = () => placeRef.current();
    window.addEventListener("resize", remeasure);
    document.fonts?.ready.then(remeasure).catch(() => {});
    return () => window.removeEventListener("resize", remeasure);
  }, []);

  const items = [...nav, { href: contactHref, label: t.contact }];

  return (
    <nav ref={navRef} aria-label="Principal" className="relative">
      <ul
        className="flex items-center gap-4 text-sm sm:gap-6"
        onMouseOver={onPointerActivity}
        onMouseLeave={onPointerLeave}
      >
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                data-nav={item.href}
                aria-current={ariaCurrent(item.href)}
                onFocus={() => {
                  clearTimers();
                  setHovered(item.href);
                }}
                onBlur={onPointerLeave}
                className={`transition-colors ${
                  active ? "text-ink" : "text-muted hover:text-ink"
                }${item.href === contactHref ? " font-medium" : ""}`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <span
        key={mark.drawKey}
        aria-hidden
        className="nav-underline"
        data-hidden={mark.hidden ? "" : undefined}
        style={{ left: mark.left, width: mark.width }}
      />
    </nav>
  );
}
