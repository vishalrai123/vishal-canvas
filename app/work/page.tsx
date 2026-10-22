import { Suspense } from "react";
import type { Metadata } from "next";
import { discipline, getAllTasks, getDisciplines, getTags } from "@/lib/content";
import { WorkExplorer } from "@/components/work/WorkExplorer";

export const metadata: Metadata = { title: "Work", description: "Every project, searchable and filterable by discipline, tag, tool and skill." };

export default function WorkPage() {
  const tasks = getAllTasks();
  const items = tasks.map((t) => ({
    slug: t.meta.slug,
    title: t.meta.title,
    summary: t.meta.oneLineSummary,
    discipline: discipline(t),
    tags: t.meta.tags,
    tools: t.sections.tools ?? [],
    skills: t.sections.skills ?? [],
  }));
  return (
    <div className="px-6 pb-32 pt-36 md:pt-44">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-5xl font-light md:text-7xl">
          All <span className="font-semibold">work</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-dim">{tasks.length} projects, each written up as a case study.</p>
        <div className="mt-12">
          <Suspense fallback={<p className="text-dim">Loading projects</p>}>
            <WorkExplorer items={items} disciplines={getDisciplines().map((d) => d.name)} tags={getTags().slice(0, 12).map((t) => t.name)} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
