"use client";

import { useEffect } from "react";
import { SECTION_HASH_EVENT } from "@/lib/section-hash";
import { nav } from "@/lib/site";

/** ids of the on-page anchors referenced by the main nav (e.g. "cases", "sobre"). */
const sectionIds = nav
  .map((item) => (item.href.startsWith("/#") ? item.href.slice(2) : null))
  .filter((id): id is string => id !== null);

/**
 * Keeps the URL hash in sync with the section the reader is actually looking at.
 * Landing on `/#cases` and scrolling back to the top drops the stale hash;
 * scrolling into a section writes it back. Uses `replaceState`, so it never adds
 * a history entry or triggers a scroll jump. Home page only.
 */
export function ScrollHashObserver() {
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const managed = new Set(sections.map((el) => `#${el.id}`));
    const visible = new Set<HTMLElement>();

    // Don't clear an incoming hash before the browser has jumped to it on a
    // direct load of `/#sobre`; only start clearing once the reader scrolls.
    let userHasScrolled = false;
    const onScroll = () => {
      userHasScrolled = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true, once: true });

    const write = (hash: string) => {
      const url = hash || window.location.pathname + window.location.search;
      window.history.replaceState(window.history.state, "", url);
      window.dispatchEvent(new Event(SECTION_HASH_EVENT));
    };

    const sync = () => {
      // topmost section in document order that currently crosses the band
      const current = sections.find((el) => visible.has(el));
      const hash = window.location.hash;
      if (current) {
        if (hash !== `#${current.id}`) write(`#${current.id}`);
      } else if (userHasScrolled && managed.has(hash)) {
        write("");
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) visible.add(el);
          else visible.delete(el);
        }
        sync();
      },
      // activation band: a thin strip near the top of the viewport
      { rootMargin: "-15% 0px -75% 0px", threshold: 0 },
    );

    for (const el of sections) observer.observe(el);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
