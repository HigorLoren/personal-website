"use client";

import { useSyncExternalStore } from "react";

/**
 * Contact e-mail that never ships in the served HTML.
 *
 * The address is passed in base64 and only decoded in the browser, so the
 * static build (this is a public repo, SSG on Vercel) carries no harvestable
 * `mailto:` or plaintext address. Until JS runs — and permanently with JS
 * disabled — the link falls back to another channel (LinkedIn).
 */
type Props = {
  /** base64-encoded address, e.g. site.emailEncoded */
  encoded: string;
  /** where to point before hydration / with JS off */
  fallbackHref: string;
  /** link text before hydration / with JS off */
  fallbackLabel: string;
  className?: string;
  /** render prop for the revealed address; defaults to the address itself */
  children?: (email: string) => React.ReactNode;
};

const noop = () => () => {};

function decode(encoded: string): string | null {
  try {
    return atob(encoded);
  } catch {
    return null;
  }
}

export function EmailLink({
  encoded,
  fallbackHref,
  fallbackLabel,
  className,
  children,
}: Props) {
  // server + first client render: null (no address in the HTML); after
  // hydration the client snapshot decodes it.
  const email = useSyncExternalStore(
    noop,
    () => decode(encoded),
    () => null,
  );

  if (!email) {
    return (
      <a
        href={fallbackHref}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {fallbackLabel}
      </a>
    );
  }

  return (
    <a href={`mailto:${email}`} className={className}>
      {children ? children(email) : email}
    </a>
  );
}
