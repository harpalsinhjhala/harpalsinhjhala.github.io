import type { MetadataRoute } from "next";
import { projects, site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, lastModified: site.lastUpdated, priority: 1 },
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}/`, lastModified: site.lastUpdated, priority: 0.8 })),
  ];
}
