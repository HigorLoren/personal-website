import type { ReactNode } from "react";
import { Container } from "@/components/container";

/**
 * Two-track editorial layout: a wide left margin that optionally holds a
 * <MarginNote>, and the main content column. Below `lg` it is a single column
 * and the note (if any) folds in under a rule after the content.
 *
 * Content always sits in the second column so the body edge stays aligned
 * whether or not a section carries a note.
 */
export function AnnotatedSection({
  note,
  id,
  className = "",
  children,
}: {
  note?: ReactNode;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Container as="section" id={id} className={className}>
      <div className="lg:grid lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-x-12 xl:grid-cols-[12rem_minmax(0,1fr)]">
        <div className="lg:col-start-2 lg:row-start-1">{children}</div>
        {note && (
          <div className="mt-10 border-t border-line pt-5 lg:col-start-1 lg:row-start-1 lg:mt-1.5 lg:border-0 lg:pt-0">
            {note}
          </div>
        )}
      </div>
    </Container>
  );
}
