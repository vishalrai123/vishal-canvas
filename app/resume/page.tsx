import Link from "next/link";
import type { Metadata } from "next";
import { discipline, getAllTasks, getDisciplines, getProfile, getSkills, getTools } from "@/lib/content";
import { PrintButton } from "@/components/PrintButton";

export const metadata: Metadata = { title: "Resume", description: "A resume built from the project write-ups, grouped by discipline." };

export default function Resume() {
  const p = getProfile();
  const tasks = getAllTasks();
  return (
    <div className="px-6 pb-32 pt-36 md:pt-44 print:pt-0">
      <div className="mx-auto max-w-4xl">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-5xl font-semibold md:text-6xl">{p.name}</h1>
            <p className="mt-3 text-lg text-dim">{p.headline}</p>
            <p className="mt-2 text-dim">
              {p.links.map((l, i) => (
                <span key={l.url}>{i > 0 && " · "}<a href={l.url} rel="noopener noreferrer">{l.url.replace("https://", "")}</a></span>
              ))}
            </p>
          </div>
          <PrintButton />
        </header>

        <p className="mt-10 max-w-3xl text-dim">{p.about}</p>

        {getDisciplines().map((d) => (
          <section key={d.name} className="mt-14">
            <h2 className="border-b border-line pb-2 font-display text-2xl font-semibold">{d.name}</h2>
            {tasks.filter((t) => discipline(t) === d.name).map((t) => (
              <div key={t.meta.taskId} className="print-break-avoid mt-6">
                <h3 className="font-display text-lg font-medium">
                  <Link href={`/work/${t.meta.slug}/`}>{t.meta.title}</Link>
                </h3>
                <p className="text-sm text-dim">{t.meta.role}</p>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-dim marker:text-accent">
                  {(t.sections.highlights ?? []).map((h, i) => (
                    <li key={h} className={i > 0 ? "print:hidden" : ""}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}

        <section className="print-break-avoid mt-14">
          <h2 className="border-b border-line pb-2 font-display text-2xl font-semibold">Tools and technologies</h2>
          <p className="mt-4 text-dim">{getTools().slice(0, 30).map((t) => t.name).join(" · ")}</p>
        </section>
        <section className="print-break-avoid mt-10">
          <h2 className="border-b border-line pb-2 font-display text-2xl font-semibold">Skills</h2>
          <p className="mt-4 text-dim">{getSkills().slice(0, 20).map((t) => t.name).join(" · ")}</p>
        </section>
      </div>
    </div>
  );
}
