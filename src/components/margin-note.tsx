import type { ReactNode } from "react";

/**
 * A dated aside in Higor's own voice — the site talking back to its own draft.
 * Sits in the left margin of an <AnnotatedSection> on wide screens; folds in
 * behind an accent rule on narrow ones. Use sparingly: two or three per page.
 */
export function MarginNote({
  date,
  children,
}: {
  date: string;
  children: ReactNode;
}) {
  return (
    <aside className="border-l-2 border-accent pl-3 text-sm leading-snug lg:border-0 lg:pl-0 lg:text-[0.8125rem]">
      <span className="block font-medium tabular-nums text-accent">{date}</span>
      <p className="mt-1 text-ink-soft">{children}</p>
    </aside>
  );
}
