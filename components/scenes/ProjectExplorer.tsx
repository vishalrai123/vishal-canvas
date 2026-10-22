"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export interface Item {
  slug: string;
  title: string;
  discipline: string;
  summary: string;
  tools: string[];
  highlight: string;
}

// Every project in one scene: filter by discipline, hover or focus a row to preview it, click to read.
export function ProjectExplorer({ items, disciplines }: { items: Item[]; disciplines: string[] }) {
  const [filter, setFilter] = useState("");
  const shown = useMemo(() => items.filter((i) => !filter || i.discipline === filter), [items, filter]);
  const [activeSlug, setActive] = useState(items[0]?.slug);
  const active = shown.find((i) => i.slug === activeSlug) ?? shown[0];

  const chip = (on: boolean) =>
    `rounded-full border px-3 py-1 font-mono text-xs transition-colors ${on ? "border-link bg-link/10 text-link" : "border-line text-muted hover:border-muted hover:text-ink"}`;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by discipline">
          <button type="button" onClick={() => setFilter("")} aria-pressed={!filter} className={chip(!filter)}>all</button>
          {disciplines.map((d) => (
            <button key={d} type="button" onClick={() => setFilter(filter === d ? "" : d)} aria-pressed={filter === d} className={chip(filter === d)}>
              {d.toLowerCase()}
            </button>
          ))}
        </div>
        <p className="mt-4 font-mono text-xs text-muted" aria-live="polite">{shown.length} of {items.length}</p>
        <ul className="mt-2 max-h-[52svh] overflow-y-auto overscroll-contain border-y border-line lg:max-h-[50vh]">
          {shown.map((i) => (
            <li key={i.slug} className="border-b border-line last:border-b-0">
              <Link
                href={`/work/${i.slug}/`}
                onMouseEnter={() => setActive(i.slug)}
                onFocus={() => setActive(i.slug)}
                className={`block px-3 py-3 transition-colors ${active?.slug === i.slug ? "bg-surface" : "hover:bg-surface"}`}
              >
                <span className={`block text-[0.95rem] font-medium ${active?.slug === i.slug ? "text-link" : "text-ink"}`}>{i.title}</span>
                <span className="mt-0.5 block font-mono text-xs text-muted">{i.discipline}</span>
                <span className="mt-1 line-clamp-2 block text-sm text-muted lg:hidden">{i.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {active && (
        <article aria-live="polite" className="hidden rounded-xl border border-line bg-surface p-8 lg:block">
          <p className="font-mono text-xs text-muted">{active.discipline}</p>
          <h3 className="mt-3 text-2xl font-semibold">{active.title}</h3>
          <p className="mt-4 text-muted">{active.summary}</p>
          {active.highlight && (
            <p className="mt-6 rounded-lg bg-surface-2 px-4 py-3 text-sm text-ink">{active.highlight}</p>
          )}
          <ul className="mt-6 flex flex-wrap gap-1.5">
            {active.tools.slice(0, 8).map((t) => (
              <li key={t} className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-xs text-muted">{t}</li>
            ))}
          </ul>
          <Link href={`/work/${active.slug}/`} className="mt-8 inline-flex items-center gap-2 font-medium text-link hover:underline">
            Read the case study <span aria-hidden="true">&rarr;</span>
          </Link>
        </article>
      )}
    </div>
  );
}
