import Link from "next/link";
import type { Profile } from "@/lib/content/types";

// Footer for inner pages; the home page ends in its own Contact scene.
export function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="border-t border-line px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="font-mono text-ink hover:text-link">~/{profile.name.toLowerCase().replace(/\s+/g, "-")}</Link>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          <li><a href={`mailto:${profile.email}`} className="hover:text-ink">{profile.email}</a></li>
          {profile.links.map((l) => (
            <li key={l.url}><a href={l.url} rel="noopener noreferrer" className="hover:text-ink">{l.label}</a></li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
