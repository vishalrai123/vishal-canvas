import Link from "next/link";
import type { Profile } from "@/lib/content/types";

export function Footer({ name, links }: { name: string; links: Profile["links"] }) {
  return (
    <footer data-site-footer className="border-t border-line px-6 py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <p className="font-display text-2xl font-semibold">{name}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-dim">
          <li><Link href="/work/" className="hover:text-sand">Work</Link></li>
          <li><Link href="/resume/" className="hover:text-sand">Resume</Link></li>
          <li><Link href="/skills/" className="hover:text-sand">Skills</Link></li>
          {links.map((l) => (
            <li key={l.url}>
              <a href={l.url} rel="noopener noreferrer" className="hover:text-sand">{l.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
