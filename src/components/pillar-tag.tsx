import type { Pillar } from "@/content/types";
import { pillarLabels } from "@/content/types";

export function PillarTag({ pillar }: { pillar: Pillar }) {
  return (
    <span className="inline-flex items-center rounded-[2px] border border-line px-2.5 py-0.5 text-xs font-medium tracking-wide text-muted">
      {pillarLabels[pillar]}
    </span>
  );
}

export function PillarTags({ pillars }: { pillars: Pillar[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {pillars.map((p) => (
        <li key={p}>
          <PillarTag pillar={p} />
        </li>
      ))}
    </ul>
  );
}
