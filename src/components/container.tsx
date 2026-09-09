import type { ElementType, ReactNode } from "react";

export function Container({
  children,
  className = "",
  as: As = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
}) {
  return (
    <As
      id={id}
      className={`mx-auto w-full max-w-7xl px-[var(--spacing-gutter)] ${className}`}
    >
      {children}
    </As>
  );
}
