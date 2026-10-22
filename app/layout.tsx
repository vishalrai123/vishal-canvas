import type { Metadata } from "next";
import { Geist, Outfit } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getProfile } from "@/lib/content";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });
const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vishalrai123.github.io/vishal-canvas";

export function generateMetadata(): Metadata {
  const p = getProfile();
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `${p.name}: ${p.headline}`, template: `%s | ${p.name}` },
    description: p.headline,
    alternates: { canonical: "./" },
  };
}

// set the stored theme before first paint so there is no flash
const themeScript = `try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const p = getProfile();
  return (
    <html lang="en" data-theme="dark" className={`${outfit.variable} ${geist.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Nav name={p.name} />
        <main className="w-full max-w-full overflow-x-hidden">{children}</main>
        <Footer name={p.name} links={p.links} />
      </body>
    </html>
  );
}
