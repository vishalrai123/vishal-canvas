import Link from "next/link";
import type { Ranked } from "@/lib/content/types";

// Horizontal accordion: on wide screens slices expand on hover or keyboard focus; stacked and open on small screens.
export function Disciplines({ groups, total }: { groups: Ranked[]; total: number }) {
  const shown = groups.slice(0, 5);
  return (
    <section className="px-6 py-28 md:py-40">
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-4xl text-4xl font-light md:text-6xl">
          One engineer, <span className="font-semibold">{groups.length} disciplines</span>, {total} projects.
        </h2>
        <div className="slices mt-14">
          {shown.map((g, i) => (
            <article key={g.name} className="slice" data-open={i === 0 ? "true" : undefined}>
              <div className="slice-title absolute left-5 top-6 font-display text-xl font-medium">{g.name}</div>
              <div className="slice-body flex h-full flex-col justify-end p-6 lg:p-10">
                <h3 className="text-2xl font-semibold lg:text-4xl">{g.name}</h3>
                <p className="mt-1 text-dim">{g.tasks.length} {g.tasks.length === 1 ? "project" : "projects"}</p>
                <ul className="mt-5 space-y-2">
                  {g.tasks.slice(0, 4).map((t) => (
                    <li key={t.meta.taskId}>
                      <Link href={`/work/${t.meta.slug}/`} className="text-sand underline decoration-line decoration-1 hover:decoration-accent">
                        {t.meta.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={`/work/?discipline=${encodeURIComponent(g.name)}`} className="mt-5 text-accent hover:underline">
                  All {g.name} work
                </Link>
              </div>
            </article>
          ))}
        </div>
        {groups.length > shown.length && (
          <p className="mt-6 text-dim">
            And {groups.length - shown.length} more disciplines in <Link href="/work/" className="text-sand underline decoration-line hover:decoration-accent">the full list</Link>.
          </p>
        )}
      </div>
    </section>
  );
}
