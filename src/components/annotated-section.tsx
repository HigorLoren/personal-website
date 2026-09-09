import type { ReactNode } from "react";
import { Container } from "@/components/container";

/**
 * Two-track editorial layout: a wide left margin that optionally holds a
 * <MarginNote>, and the main content column. Below `lg` it is a single column
 * and the note (if any) comes before the section content.
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
        {note && (
          <div className="lg:col-start-1 lg:row-start-1 lg:mt-1.5">{note}</div>
        )}
        <div className="lg:col-start-2 lg:row-start-1">{children}</div>
      </div>
    </Container>
  );
}
