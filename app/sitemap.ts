import type { MetadataRoute } from "next";
import { getAllTasks } from "@/lib/content";
import { SITE_URL as SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", ...getAllTasks().map((t) => `/work/${t.meta.slug}`)];
  return pages.map((p) => ({ url: `${SITE}${p}/` }));
}
