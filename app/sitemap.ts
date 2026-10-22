import type { MetadataRoute } from "next";
import { getAllTasks } from "@/lib/content";

export const dynamic = "force-static";
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vishalrai123.github.io/vishal-canvas";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/resume", "/skills", "/about", ...getAllTasks().map((t) => `/work/${t.meta.slug}`)];
  return pages.map((p) => ({ url: `${SITE}${p}/` }));
}
