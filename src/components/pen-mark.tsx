"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * A red marking-pen stroke drawn under one word, as if someone had grifado the
 * draft while proof-reading it. Two passes of a hand-drawn underline, revealed
 * on load with a stroke-dashoffset animation (pure CSS, so it starts before
 * hydration). The single hero-only use of the accent as *motion*.
 *
 * The stroke drifts a few pixels with the cursor and with scroll — enough to
 * feel like ink sitting on top of the page rather than part of the type. Both
 * the reveal and the drift are switched off under `prefers-reduced-motion`,
 * where the mark simply appears static.
 */
export function PenMark({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    let mx = 0;
    let my = 0;
    let frame = 0;

    const paint = () => {
      frame = 0;
      const sy = Math.max(-4, Math.min(4, window.scrollY * -0.03));
      el.style.setProperty("--pen-x", `${mx.toFixed(2)}px`);
      el.style.setProperty("--pen-y", `${(my + sy).toFixed(2)}px`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onMove = (e: PointerEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      mx = ((e.clientX - w / 2) / w) * 6;
      my = ((e.clientY - h / 2) / h) * 4;
      schedule();
    };

    if (finePointer) window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span ref={ref} className="pen-mark relative inline-block">
      {children}
      <svg
        aria-hidden="true"
        focusable="false"
        className="pen-mark__ink"
        viewBox="0 0 100 14"
        preserveAspectRatio="none"
      >
        <path
          pathLength={1}
          d="M1.5 5.5 C 22 3.5, 48 8.5, 72 6 S 92 3.5, 98.5 5
             M97 10.5 C 76 10, 52 12.5, 30 10.5 S 9 8.5, 3 10"
        />
      </svg>
    </span>
  );
}
