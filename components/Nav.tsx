"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { href: "/work/", label: "Work" },
  { href: "/resume/", label: "Resume" },
  { href: "/skills/", label: "Skills" },
  { href: "/about/", label: "About" },
];

export function Nav({ name }: { name: string }) {
  const path = usePathname();
  const active = (href: string) => path === href || path.startsWith(href);
  return (
    <nav data-site-nav aria-label="Main" className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="flex w-full max-w-3xl items-center justify-between gap-3 rounded-full border border-line bg-ground/85 py-2 pl-5 pr-2 backdrop-blur-md">
        <Link href="/" className="font-display text-base font-semibold tracking-tight">
          {name}
        </Link>
        <ul className="flex items-center gap-1 text-sm sm:gap-2">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={active(l.href) ? "page" : undefined}
                className={`rounded-full px-2.5 py-1.5 transition-colors sm:px-3 ${active(l.href) ? "bg-plate-2 text-sand" : "text-dim hover:text-sand"}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
}
