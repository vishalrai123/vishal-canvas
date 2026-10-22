import Link from "next/link";
import { discipline, getAllTasks, getDisciplines, getFeatured, getProfile, getTools, leadMetric } from "@/lib/content";
import { RESUME } from "@/lib/site";
import { SceneChrome, type SceneRef } from "@/components/scenes/SceneChrome";
import { ProjectExplorer } from "@/components/scenes/ProjectExplorer";

const H2 = "text-3xl font-semibold md:text-5xl";
const BTN = "inline-flex h-11 items-center rounded-md px-5 font-medium transition-colors";
// staggered reveal for the children of a scene
const r = (d: number) => ({ className: "reveal", style: { ["--d" as string]: d } });

function Scene({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-label={label} className="scene">
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export default function Home() {
  const p = getProfile();
  const tasks = getAllTasks();
  const featured = getFeatured(4);
  const job = p.experience[0];
  const certs = p.achievements.filter((a) => /certif/i.test(a.lead));
  const awards = p.achievements.filter((a) => !/certif/i.test(a.lead));

  const expScenes = job.groups.map((g, i) => ({ id: i === 0 ? "experience" : `experience-${i + 1}`, label: g.name, group: "Experience" }));
  const scenes: SceneRef[] = [
    { id: "intro", label: "Intro", group: "Intro" },
    { id: "about", label: "About", group: "About" },
    ...expScenes,
    { id: "work", label: "Selected work", group: "Selected work" },
    { id: "projects", label: "All projects", group: "All projects" },
    { id: "skills", label: "Skills", group: "Skills" },
    { id: "education", label: "Education", group: "Education" },
    { id: "contact", label: "Contact", group: "Contact" },
  ];
  const items = tasks.map((t) => ({
    slug: t.meta.slug,
    title: t.meta.title,
    discipline: discipline(t),
    summary: t.meta.oneLineSummary,
    tools: t.sections.tools ?? [],
    highlight: t.sections.highlights?.[0] ?? "",
  }));
  const bento = ["lg:col-span-2", "", "", "lg:col-span-2"];
  const slugify = (s: string) => s.replace(/&/g, "and").replace(/\(.*?\)/g, "").trim().split(/\s+/).map((w, i) => (i ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase())).join("").replace(/[^A-Za-z0-9]/g, "");

  return (
    <main className="scenes w-full max-w-full overflow-x-clip">
      <SceneChrome scenes={scenes} />

      <Scene id="intro" label="Intro">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
          <div>
            <h1 {...r(0)} className="reveal text-[clamp(2.75rem,7vw,5.5rem)] font-semibold">{p.name}</h1>
            <p {...r(1)} className="reveal mt-4 max-w-xl text-xl text-muted md:text-2xl">{p.headline}.</p>
            <p {...r(2)} className="reveal mt-6 max-w-xl text-muted">{p.summary.split(". ")[0]}.</p>
            <div {...r(3)} className="reveal mt-10 flex flex-wrap gap-3">
              <a href="#work" className={`${BTN} bg-accent text-on-accent hover:brightness-110`}>Explore my work</a>
              <a href={RESUME.onePage} className={`${BTN} border border-line text-ink hover:border-muted hover:bg-surface`}>Download resume</a>
            </div>
            <p {...r(4)} className="reveal mt-10 font-mono text-xs text-muted">Scroll to move through each section, or press <kbd className="rounded border border-line px-1">Ctrl K</kbd> to jump.</p>
          </div>
          <div {...r(2)} className="reveal overflow-hidden rounded-xl border border-line bg-surface font-mono text-sm shadow-[0_16px_48px_rgb(1_4_9/0.35)]">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5 text-xs text-muted">
              <span>zsh</span>
              <span>~/portfolio</span>
            </div>
            <div className="space-y-4 p-5 leading-relaxed">
              <div>
                <p><span className="text-ok">$</span> <span className="typed" style={{ ["--n" as string]: 6, ["--w" as string]: "6ch" }}>whoami</span></p>
                <p className="text-ink">{p.name}, {job.role} @ {job.company}</p>
              </div>
              <div>
                <p><span className="text-ok">$</span> cat location.txt</p>
                <p className="text-str">{p.location}</p>
              </div>
              <div>
                <p><span className="text-ok">$</span> echo $STACK</p>
                <p className="text-ink">{p.stack.join(" · ")}</p>
              </div>
              <div>
                <p><span className="text-ok">$</span> ls projects/ | wc -l</p>
                <p className="text-num">{tasks.length}</p>
              </div>
              <p><span className="text-ok">$</span> <span className="caret" aria-hidden="true" /></p>
            </div>
          </div>
        </div>
      </Scene>

      <Scene id="about" label="About">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
          <div>
            <h2 {...r(0)} className={`reveal ${H2}`}>About</h2>
            <p {...r(1)} className="reveal mt-8 text-lg leading-relaxed text-muted md:text-xl md:leading-relaxed">{p.summary}</p>
          </div>
          <ul className="space-y-4 self-end">
            {awards.map((a, i) => (
              <li key={a.lead} {...r(i + 2)} className="reveal rounded-xl border border-line bg-surface p-5">
                <p className="font-medium">{a.lead}</p>
                <p className="mt-1 text-sm text-muted">{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Scene>

      {job.groups.map((g, gi) => (
        <Scene key={g.name} id={expScenes[gi].id} label={`Experience: ${g.name}`}>
          <h2 {...r(0)} className={`reveal max-w-4xl ${H2}`}>{g.name}</h2>
          <p {...r(1)} className="reveal mt-4 text-muted">
            {job.role} at <span className="text-ink">{job.company}</span> <span className="font-mono text-sm">· {job.period}</span>
          </p>
          <ul className="mt-10 grid gap-x-10 gap-y-7 md:grid-cols-2">
            {g.items.map((it, i) => (
              <li key={it.lead} {...r(i + 2)} className="reveal">
                <h3 className="text-lg font-semibold">{it.lead}</h3>
                <p className="mt-2 text-muted">{it.text}</p>
              </li>
            ))}
          </ul>
          {job.groups[gi + 1] && (
            <a href={`#${expScenes[gi + 1].id}`} {...r(6)} className="reveal mt-10 inline-block font-mono text-sm text-link hover:underline">
              next: {job.groups[gi + 1].name} &darr;
            </a>
          )}
        </Scene>
      ))}

      <Scene id="work" label="Selected work">
        <h2 {...r(0)} className={`reveal ${H2}`}>Selected work</h2>
        <p {...r(1)} className="reveal mt-4 max-w-2xl text-muted">Projects where the result was measured.</p>
        <ul className="mt-8 grid grid-flow-dense gap-4 lg:grid-cols-3">
          {featured.map((t, i) => (
            <li key={t.meta.taskId} {...r(i + 2)} className={`reveal ${bento[i] ?? ""}`}>
              <Link href={`/work/${t.meta.slug}/`} className="group flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-link">
                <span className="font-mono text-xs text-muted">{discipline(t)}</span>
                <span className="mt-3 text-xl font-semibold leading-snug md:text-2xl">{leadMetric(t)}</span>
                <span className="mt-2 text-muted">{t.meta.title}</span>
                <span className="mt-auto flex flex-wrap gap-1.5 pt-4">
                  {(t.sections.tools ?? []).slice(0, 3).map((x) => (
                    <span key={x} className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-xs text-muted">{x}</span>
                  ))}
                </span>
                <span className="mt-4 text-sm font-medium text-link group-hover:underline">Read the case study &rarr;</span>
              </Link>
            </li>
          ))}
        </ul>
      </Scene>

      <Scene id="projects" label="All projects">
        <h2 {...r(0)} className={`reveal ${H2}`}>All {tasks.length} projects</h2>
        <p {...r(1)} className="reveal mt-4 max-w-2xl text-muted">Hover a project to preview it, or open the full case study.</p>
        <div {...r(2)} className="reveal mt-8">
          <ProjectExplorer items={items} disciplines={getDisciplines().map((d) => d.name)} />
        </div>
      </Scene>

      <Scene id="skills" label="Skills">
        <h2 {...r(0)} className={`reveal ${H2}`}>Skills</h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
          <div {...r(1)} className="reveal overflow-hidden rounded-xl border border-line bg-surface font-mono text-[0.8rem] leading-relaxed">
            <div className="border-b border-line px-4 py-2.5 text-xs text-muted">competencies.ts</div>
            <pre className="whitespace-pre-wrap break-words p-5"><code>
              <span className="text-key">export const</span> <span className="text-num">competencies</span> = {"{\n"}
              {p.competencies.map((c) => (
                <span key={c.area}>
                  {"  "}<span className="text-key">{slugify(c.area)}</span>: [{c.items.map((x, i) => (
                    <span key={x}><span className="text-str">&quot;{x}&quot;</span>{i < c.items.length - 1 ? ", " : ""}</span>
                  ))}],{"\n"}
                </span>
              ))}
              {"}"} <span className="text-key">as const</span>;
            </code></pre>
          </div>
          <div {...r(2)} className="reveal">
            <h3 className="text-lg font-semibold">Most used across my projects</h3>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {getTools().slice(0, 10).map((t) => (
                <li key={t.name} className="flex items-center justify-between py-2.5 text-sm">
                  <span>{t.name}</span>
                  <span className="font-mono text-muted">{t.tasks.length}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Scene>

      <Scene id="education" label="Education">
        <h2 {...r(0)} className={`reveal ${H2}`}>Education</h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <ol className="space-y-8">
            {p.education.map((e, i) => (
              <li key={e.school} {...r(i + 1)} className="reveal">
                <p className="font-mono text-sm text-muted">{e.period}</p>
                <h3 className="mt-1 text-xl font-semibold">{e.degree}</h3>
                <p className="mt-1 text-muted">{e.school}</p>
              </li>
            ))}
          </ol>
          <div className="space-y-8">
            <div {...r(3)} className="reveal">
              <h3 className="text-lg font-semibold">Certifications</h3>
              <ul className="mt-3 space-y-1 text-muted">{certs.map((c) => <li key={c.text}>{c.text}</li>)}</ul>
            </div>
            <div {...r(4)} className="reveal">
              <h3 className="text-lg font-semibold">Languages</h3>
              <ul className="mt-3 space-y-1 text-muted">
                {p.languages.map((l) => <li key={l.name}><span className="text-ink">{l.name}</span> · {l.level}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </Scene>

      <Scene id="contact" label="Contact">
        <h2 {...r(0)} className="reveal text-4xl font-semibold md:text-6xl">Let&apos;s build something reliable.</h2>
        <p {...r(1)} className="reveal mt-6 max-w-2xl text-lg text-muted">Open to conversations about backend, platform and DevOps engineering roles.</p>
        <a {...r(2)} href={`mailto:${p.email}`} className="reveal mt-10 inline-block break-all font-mono text-xl text-link hover:underline md:text-3xl">{p.email}</a>
        <div {...r(3)} className="reveal mt-10 flex flex-wrap gap-3">
          {p.links.map((l) => (
            <a key={l.url} href={l.url} rel="noopener noreferrer" className={`${BTN} border border-line text-ink hover:border-muted hover:bg-surface`}>{l.label}</a>
          ))}
          <a href={RESUME.onePage} className={`${BTN} bg-accent text-on-accent hover:brightness-110`}>Resume (1 page)</a>
          <a href={RESUME.twoPages} className={`${BTN} border border-line text-ink hover:border-muted hover:bg-surface`}>Resume (2 pages)</a>
        </div>
        <p {...r(4)} className="reveal mt-10 text-muted">{p.location}</p>
        <p className="mt-16 font-mono text-xs text-muted">Every project on this page is generated from a Markdown file.</p>
      </Scene>
    </main>
  );
}
