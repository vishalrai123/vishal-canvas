import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getAllTasks, getProfile } from "@/lib/content";
import { RESUME_URL, SCENES, SITE_URL } from "@/lib/site";
import { CommandPalette, PaletteButton, type Command } from "@/components/CommandPalette";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Spotlight } from "@/components/Spotlight";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export function generateMetadata(): Metadata {
  const p = getProfile();
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `${p.name} | ${p.title}`, template: `%s | ${p.name}` },
    description: p.headline,
    alternates: { canonical: "./" },
  };
}

// set the stored theme before first paint, and mark JS as available for scene reveals
const bootScript = `try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}document.documentElement.classList.add("js")`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const p = getProfile();
  const commands: Command[] = [
    ...SCENES.map((s) => ({ label: s.label, group: "section", scene: s.id })),
    ...getAllTasks().map((t) => ({ label: t.meta.title, group: "project", path: `/work/${t.meta.slug}/` })),
    { label: "Download resume (PDF)", group: "resume", href: RESUME_URL },
    { label: `Copy email ${p.email}`, group: "contact", action: "copy-email" },
    ...p.links.map((l) => ({ label: `Open ${l.label}`, group: "contact", href: l.url })),
    { label: "Toggle light / dark theme", group: "settings", action: "theme" },
  ];
  return (
    <html lang="en" data-theme="dark" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <Spotlight />
        <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg">
          <div className="flex h-14 items-center justify-between gap-4 px-4 lg:px-10">
            <Link href="/" className="font-mono text-sm text-ink hover:text-link">
              ~/{p.name.toLowerCase().replace(/\s+/g, "-")}
            </Link>
            <div className="flex items-center gap-2">
              <a href={RESUME_URL} className="hidden h-8 items-center rounded-md bg-accent px-3 text-sm font-medium text-on-accent hover:brightness-110 sm:flex">
                Resume
              </a>
              <PaletteButton />
              <ThemeToggle />
            </div>
          </div>
        </header>
        {children}
        <CommandPalette commands={commands} email={p.email} />
      </body>
    </html>
  );
}
