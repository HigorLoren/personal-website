import type { MetadataRoute } from "next";
import { cases } from "@/content/cases";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: site.url, priority: 1 },
    { url: `${site.url}/sobre`, priority: 0.8 },
  ];

  for (const c of cases) {
    routes.push({ url: `${site.url}/cases/${c.slug}`, priority: 0.6 });
  }

  return routes;
}
