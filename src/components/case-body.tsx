import EsteSiteBody from "@/content/cases/este-site/content.mdx";
import SaasTurismoBody from "@/content/cases/saas-turismo/content.mdx";
import CardFinderBody from "@/content/cases/card-finder/content.mdx";

/**
 * Renders a case study's MDX body by slug. Each branch references a
 * module-level MDX component directly — no dynamic component selection.
 */
export function CaseBody({ slug }: { slug: string }) {
  switch (slug) {
    case "este-site":
      return <EsteSiteBody />;
    case "saas-turismo":
      return <SaasTurismoBody />;
    case "card-finder":
      return <CardFinderBody />;
    default:
      return null;
  }
}

export function hasCaseBody(slug: string): boolean {
  return ["este-site", "saas-turismo", "card-finder"].includes(slug);
}
