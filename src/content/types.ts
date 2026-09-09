export type Pillar = "tecnica" | "uiux" | "produto";

export const pillarLabels: Record<Pillar, string> = {
  tecnica: "Técnica",
  uiux: "UI/UX",
  produto: "Produto",
};

export interface CaseMeta {
  /** URL segment — /cases/<slug> */
  slug: string;
  title: string;
  /** One line, shown on the home card */
  tagline: string;
  year: string;
  role: string;
  /** Short paragraph shown in the case page header */
  summary: string;
  pillars: Pillar[];
  stack: string[];
  /** Path under /public, e.g. /assets/cases/card-finder/cover.png */
  cover: string;
  liveUrl?: string;
  repoUrl?: string;
  /**
   * Client work under NDA. When true, the case template hides any repo link and
   * only renders images stored under assets/cases/<slug>/public/.
   */
  ndaSafe?: boolean;
  /** Ascending sort on the home grid */
  order: number;
}
