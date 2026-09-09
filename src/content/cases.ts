import type { CaseMeta } from "./types";

import { meta as esteSite } from "./cases/este-site/meta";
import { meta as bussola } from "./cases/bussola/meta";
import { meta as donko } from "./cases/donko/meta";

export const cases: CaseMeta[] = [esteSite, bussola, donko].sort(
  (a, b) => a.order - b.order,
);

export function getCase(slug: string): CaseMeta | undefined {
  return cases.find((c) => c.slug === slug);
}

export function getAdjacentCase(slug: string): CaseMeta | undefined {
  const i = cases.findIndex((c) => c.slug === slug);
  if (i === -1) return undefined;
  return cases[(i + 1) % cases.length];
}
