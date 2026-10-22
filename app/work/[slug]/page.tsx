import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { discipline, getAllTasks, getRelated, getTask } from "@/lib/content";

export const dynamicParams = false;
export const generateStaticParams = () => getAllTasks().map((t) => ({ slug: t.meta.slug }));

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const t = getTask((await params).slug);
  if (!t) return {};
  const description = t.meta.oneLineSummary.length > 160 ? `${t.meta.oneLineSummary.slice(0, 157)}...` : t.meta.oneLineSummary;
  return { title: t.meta.title, description, alternates: { canonical: `/work/${t.meta.slug}/` } };
}

const H2 = "font-display text-3xl font-semibold md:text-4xl";

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const task = getTask((await params).slug);
  if (!task) notFound();
  const s = task.sections;
  const all = getAllTasks();
  const idx = all.findIndex((t) => t.meta.taskId === task.meta.taskId);
  const prev = all[idx - 1];
  const next = all[idx + 1];
  const related = getRelated(task);

  // sections present, in order; null sections are hidden rather than shown empty
  const toc = [
    s.overview && ["overview", "Overview"],
    s.problem && ["problem", "The problem"],
    s.objectives && ["objectives", "Objectives"],
    s.approach && ["approach", "Approach"],
    s.tools && ["tools", "Tools and technologies"],
    s.challenges && ["challenges", "Challenges and mitigations"],
    s.outcomes && ["outcomes", "Outcomes and impact"],
    s.skills && ["skills", "Skills demonstrated"],
  ].filter(Boolean) as [string, string][];

  return (
    <article className="px-6 pb-32 pt-36 md:pt-44">
      <div className="mx-auto max-w-6xl">
        <Link href="/work/" className="text-dim hover:text-sand">&larr; All work</Link>
        <h1 className="mt-8 max-w-5xl text-4xl font-light md:text-6xl">{task.meta.title}</h1>
        <p className="mt-6 text-dim">
          {discipline(task)} · {task.meta.role}
          {task.meta.confidential && <span className="ml-3 rounded-full border border-line px-3 py-0.5 text-sm">Under NDA</span>}
        </p>
        {s.summary && <p className="mt-10 max-w-3xl text-lg leading-relaxed text-sand">{s.summary.text}</p>}

        {s.highlights && (
          <aside className="mt-12 max-w-3xl rounded-3xl border border-line bg-plate p-8">
            <h2 className="font-display text-xl font-semibold">In short</h2>
            <ul className="mt-4 space-y-3 text-dim">
              {s.highlights.map((h) => (
                <li key={h} className="pl-1">{h}</li>
              ))}
            </ul>
          </aside>
        )}

        <div className="mt-20 grid gap-12 lg:grid-cols-[14rem_1fr] lg:gap-20">
          <nav aria-label="On this page" className="hidden lg:block">
            <ul className="sticky top-28 space-y-3 text-sm">
              {toc.map(([id, label]) => (
                <li key={id}><a href={`#${id}`} className="text-dim hover:text-sand">{label}</a></li>
              ))}
            </ul>
          </nav>

          <div className="space-y-20">
            {s.overview && (
              <section id="overview"><h2 className={H2}>Overview</h2><div className="prose-case mt-6" dangerouslySetInnerHTML={{ __html: s.overview }} /></section>
            )}
            {s.problem && (
              <section id="problem"><h2 className={H2}>The problem</h2><div className="prose-case mt-6" dangerouslySetInnerHTML={{ __html: s.problem }} /></section>
            )}
            {s.objectives && (
              <section id="objectives">
                <h2 className={H2}>Objectives</h2>
                <ul className="mt-6 max-w-2xl space-y-3 text-dim">
                  {s.objectives.map((o) => (
                    <li key={o} className="flex gap-3"><span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{o}</li>
                  ))}
                </ul>
              </section>
            )}
            {s.approach && (
              <section id="approach"><h2 className={H2}>Approach</h2><div className="prose-case mt-6" dangerouslySetInnerHTML={{ __html: s.approach.html }} /></section>
            )}
            {s.tools && (
              <section id="tools">
                <h2 className={H2}>Tools and technologies</h2>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.tools.map((t) => (
                    <li key={t}><Link href={`/work/?tool=${encodeURIComponent(t)}`} className="block rounded-full border border-line px-4 py-1.5 text-sm text-dim hover:border-accent hover:text-sand">{t}</Link></li>
                  ))}
                </ul>
              </section>
            )}
            {s.challenges && (
              <section id="challenges">
                <h2 className={H2}>Challenges and mitigations</h2>
                <div className="mt-6 divide-y divide-line border-y border-line">
                  {s.challenges.map((c) => (
                    <div key={c.challenge} className="grid gap-2 py-5 md:grid-cols-2 md:gap-10">
                      <p className="font-medium">{c.challenge}</p>
                      <p className="text-dim">{c.mitigation}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {s.outcomes && (
              <section id="outcomes">
                <h2 className={H2}>Outcomes and impact</h2>
                <div className="mt-6 grid gap-10 md:grid-cols-2">
                  <div>
                    <h3 className="font-display text-lg font-semibold">What now exists</h3>
                    <ul className="mt-4 space-y-3 text-dim">{s.outcomes.deliverables.map((d) => <li key={d}>{d}</li>)}</ul>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">Value delivered</h3>
                    <ul className="mt-4 space-y-3 text-dim">{s.outcomes.value.map((v) => <li key={v}>{v}</li>)}</ul>
                  </div>
                </div>
              </section>
            )}
            {s.skills && (
              <section id="skills">
                <h2 className={H2}>Skills demonstrated</h2>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.skills.map((k) => (
                    <li key={k}><Link href={`/work/?skill=${encodeURIComponent(k)}`} className="block rounded-full border border-line px-4 py-1.5 text-sm text-dim hover:border-accent hover:text-sand">{k}</Link></li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-28">
            <h2 className={H2}>Related work</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {related.map((r) => (
                <li key={r.meta.taskId}><Link href={`/work/${r.meta.slug}/`} className="block py-5 font-display text-xl hover:text-accent">{r.meta.title}</Link></li>
              ))}
            </ul>
          </section>
        )}

        <nav aria-label="Previous and next project" className="mt-20 flex flex-col justify-between gap-6 border-t border-line pt-10 sm:flex-row">
          {prev ? <Link href={`/work/${prev.meta.slug}/`} className="max-w-sm text-dim hover:text-sand">&larr; {prev.meta.title}</Link> : <span />}
          {next ? <Link href={`/work/${next.meta.slug}/`} className="max-w-sm text-dim hover:text-sand sm:text-right">{next.meta.title} &rarr;</Link> : <span />}
        </nav>
      </div>
    </article>
  );
}
