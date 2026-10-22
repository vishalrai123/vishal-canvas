import Link from "next/link";
import type { Task } from "@/lib/content/types";
import { leadMetric } from "@/lib/content";

// Left column is pinned by GSAP ScrollTrigger on wide screens; plates scale in and fade out as they pass.
export function Outcomes({ tasks }: { tasks: Task[] }) {
  return (
    <section className="px-6 py-28 md:py-40">
      <div data-pin-root className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div data-pin-left className="self-start">
          <h2 className="text-4xl font-light md:text-6xl">
            Where the <span className="font-semibold">numbers moved</span>
          </h2>
          <p className="mt-6 max-w-md text-dim">Outcomes that are quantified in the project write-ups, each one a click away from the full case study.</p>
        </div>
        <ol className="space-y-8 lg:space-y-32">
          {tasks.map((t) => (
            <li key={t.meta.taskId} data-plate className="rounded-3xl border border-line bg-plate p-8 md:p-12">
              <p className="font-display text-3xl font-medium leading-tight md:text-4xl">{leadMetric(t)}</p>
              <p className="mt-6 text-dim">{t.meta.title}</p>
              <Link href={`/work/${t.meta.slug}/`} className="mt-6 inline-block text-accent hover:underline">
                Read the case study
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
