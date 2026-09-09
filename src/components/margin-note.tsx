import type { ReactNode } from "react";

/**
 * A tagged aside in Higor's own voice — the site marking up its own draft. The
 * remark is set in a handwriting face so it reads as a scrawl against the
 * typeset page; a short printed tag (a revision or a kind: "rev. 4", "nota",
 * "correção") stands in the margin like a proofreader's mark.
 *
 * On wide screens it sits in the left margin of an <AnnotatedSection>; on
 * narrow screens it comes *before* the section content, set off by an accent
 * rule. Use sparingly: two or three per page.
 */
export function MarginNote({
  tag,
  children,
}: {
  tag: string;
  children: ReactNode;
}) {
  return (
    <aside className="mb-8 -rotate-1 border-l-2 border-accent pl-3 lg:mb-0 lg:border-0 lg:pl-0">
      <span className="block text-[0.6875rem] font-medium text-muted">{tag}</span>
      <p className="font-hand mt-0.5 text-[1.15rem] leading-snug text-accent lg:text-[1.0625rem]">
        {children}
      </p>
    </aside>
  );
}
