import Link from "next/link";
import type { Metadata } from "next";
import { getDisciplines, getProfile } from "@/lib/content";

export const metadata: Metadata = { title: "About", description: "Who builds this work and how to get in touch." };

export default function About() {
  const p = getProfile();
  const disciplines = getDisciplines();
  return (
    <div className="px-6 pb-32 pt-36 md:pt-44">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-5xl font-light md:text-7xl">
          About <span className="font-semibold">{p.name}</span>
        </h1>
        <p className="mt-8 max-w-2xl font-display text-2xl font-light leading-relaxed">{p.headline}</p>
        <p className="mt-6 max-w-2xl text-lg text-dim">{p.about}</p>

        <h2 className="mt-16 font-display text-3xl font-semibold">Areas of work</h2>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {disciplines.map((d) => (
            <li key={d.name}>
              <Link href={`/work/?discipline=${encodeURIComponent(d.name)}`} className="flex justify-between py-4 hover:text-accent">
                <span>{d.name}</span>
                <span className="text-dim tabular-nums">{d.tasks.length}</span>
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="mt-16 font-display text-3xl font-semibold">Elsewhere</h2>
        <ul className="mt-6 space-y-2">
          {p.links.map((l) => (
            <li key={l.url}><a href={l.url} rel="noopener noreferrer" className="text-accent underline">{l.label}</a></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
