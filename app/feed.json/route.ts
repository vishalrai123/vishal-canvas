import { getAllTasks, getProfile } from "@/lib/content";

export const dynamic = "force-static";
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vishalrai123.github.io/vishal-canvas";

// JSON Feed 1.1 of every published project
export function GET() {
  const p = getProfile();
  return Response.json({
    version: "https://jsonfeed.org/version/1.1",
    title: `${p.name}: work`,
    home_page_url: `${SITE}/`,
    items: getAllTasks().map((t) => ({
      id: t.meta.taskId,
      url: `${SITE}/work/${t.meta.slug}/`,
      title: t.meta.title,
      summary: t.meta.oneLineSummary,
      tags: t.meta.tags,
    })),
  });
}
