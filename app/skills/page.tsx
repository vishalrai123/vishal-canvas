import Link from "next/link";
import type { Metadata } from "next";
import { getSkills, getTools } from "@/lib/content";
import type { Ranked } from "@/lib/content/types";

export const metadata: Metadata = { title: "Skills", description: "Every tool and skill, linked to the projects that use it." };

function Cloud({ items, param }: { items: Ranked[]; param: "tool" | "skill" }) {
  return (
    <ul className="mt-8 flex flex-wrap gap-2">
      {items.map((i) => (
        <li key={i.name}>
          <Link
            href={`/work/?${param}=${encodeURIComponent(i.name)}`}
            className="flex items-baseline gap-2 rounded-full border border-line px-4 py-2 text-dim transition-colors hover:border-accent hover:text-sand"
          >
            {i.name}
            <span className="text-sm tabular-nums text-dim">{i.tasks.length}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Skills() {
  return (
    <div className="px-6 pb-32 pt-36 md:pt-44">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-5xl font-light md:text-7xl">
          Tools and <span className="font-semibold">skills</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-dim">Each one opens the projects that use it. The number is how many projects.</p>

        <h2 className="mt-20 font-display text-3xl font-semibold">Tools and technologies</h2>
        <Cloud items={getTools()} param="tool" />

        <h2 className="mt-20 font-display text-3xl font-semibold">Skills demonstrated</h2>
        <Cloud items={getSkills()} param="skill" />
      </div>
    </div>
  );
}
