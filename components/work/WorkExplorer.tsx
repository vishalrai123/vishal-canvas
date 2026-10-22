"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import MiniSearch from "minisearch";

export interface Item {
  slug: string;
  title: string;
  summary: string;
  discipline: string;
  tags: string[];
  tools: string[];
  skills: string[];
}

const KEYS = ["discipline", "tag", "tool", "skill"] as const;
type Key = (typeof KEYS)[number];
const has = (list: string[], v: string) => list.some((x) => x.toLowerCase() === v.toLowerCase());

export function WorkExplorer({ items, disciplines, tags }: { items: Item[]; disciplines: string[]; tags: string[] }) {
  const router = useRouter();
  const path = usePathname();
  const sp = useSearchParams();
  const urlQ = sp.get("q") ?? "";
  // the input is local state so typing never waits on the URL; the URL follows after a short pause
  const [q, setQ] = useState(urlQ);
  const active = Object.fromEntries(KEYS.map((k) => [k, sp.get(k) ?? ""])) as Record<Key, string>;

  const set = (patch: Record<string, string>) => {
    const next = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    const qs = next.toString();
    router.replace(qs ? `${path}?${qs}` : path, { scroll: false });
  };

  useEffect(() => {
    if (q === urlQ) return;
    const id = setTimeout(() => set({ q }), 250);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const index = useMemo(() => {
    const ms = new MiniSearch({ fields: ["title", "summary", "tags", "tools", "skills"], storeFields: [], searchOptions: { prefix: true, fuzzy: 0.2 } });
    ms.addAll(items.map((i) => ({ id: i.slug, title: i.title, summary: i.summary, tags: i.tags.join(" "), tools: i.tools.join(" "), skills: i.skills.join(" ") })));
    return ms;
  }, [items]);

  const shown = useMemo(() => {
    const hits = q.trim() ? new Set(index.search(q).map((r) => String(r.id))) : null;
    return items.filter(
      (i) =>
        (!hits || hits.has(i.slug)) &&
        (!active.discipline || i.discipline === active.discipline) &&
        (!active.tag || has(i.tags, active.tag)) &&
        (!active.tool || has(i.tools, active.tool)) &&
        (!active.skill || has(i.skills, active.skill)),
    );
  }, [items, index, q, active.discipline, active.tag, active.tool, active.skill]);

  const chip = (on: boolean) =>
    `rounded-full border px-4 py-1.5 text-sm transition-colors ${on ? "border-accent bg-accent text-on-accent" : "border-line text-dim hover:text-sand"}`;
  const filtered = q || KEYS.some((k) => active[k]);

  return (
    <div>
      <label className="block">
        <span className="sr-only">Search projects</span>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by title, tool or topic"
          className="w-full rounded-full border border-line bg-plate px-6 py-4 text-lg text-sand placeholder:text-dim"
        />
      </label>

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by discipline">
        <button type="button" onClick={() => set({ discipline: "" })} aria-pressed={!active.discipline} className={chip(!active.discipline)}>All</button>
        {disciplines.map((d) => (
          <button key={d} type="button" onClick={() => set({ discipline: active.discipline === d ? "" : d })} aria-pressed={active.discipline === d} className={chip(active.discipline === d)}>
            {d}
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
        {tags.map((t) => (
          <button key={t} type="button" onClick={() => set({ tag: active.tag === t ? "" : t })} aria-pressed={active.tag.toLowerCase() === t.toLowerCase()} className={chip(active.tag.toLowerCase() === t.toLowerCase())}>
            {t}
          </button>
        ))}
      </div>
      {(active.tool || active.skill) && (
        <p className="mt-4 text-dim">
          Showing work that uses <strong className="text-sand">{active.tool || active.skill}</strong>.{" "}
          <button type="button" onClick={() => set({ tool: "", skill: "" })} className="text-accent underline">Clear</button>
        </p>
      )}

      <p className="mt-8 text-dim" aria-live="polite">
        {shown.length} of {items.length} projects
        {filtered && (
          <>
            {" "}
            <button type="button" onClick={() => { setQ(""); router.replace(path, { scroll: false }); }} className="ml-2 text-accent underline">Clear all</button>
          </>
        )}
      </p>

      {shown.length === 0 ? (
        <p className="mt-10 text-xl text-dim">Nothing matches. Try a broader search or clear the filters.</p>
      ) : (
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {shown.map((i) => (
            <li key={i.slug}>
              <Link href={`/work/${i.slug}/`} className="group grid gap-2 py-7 md:grid-cols-[1fr_auto] md:gap-10">
                <span>
                  <span className="block font-display text-2xl font-medium group-hover:text-accent md:text-3xl">{i.title}</span>
                  <span className="mt-2 line-clamp-2 block max-w-3xl text-dim">{i.summary}</span>
                </span>
                <span className="text-sm text-dim md:self-center md:text-right">{i.discipline}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
