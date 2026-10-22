"use client";

import Link from "next/link";
import { useState } from "react";

export interface Slide {
  text: string;
  title: string;
  slug: string;
}

// Real resume highlights from the task files; no autoplay so people can read at their own pace.
export function HighlightCarousel({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((i + d + slides.length) % slides.length);
  const s = slides[i];
  return (
    <section className="px-6 py-28 md:py-40" aria-roledescription="carousel" aria-label="Highlights from the work">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[4fr_8fr]">
        <h2 className="text-4xl font-light md:text-5xl">
          What the work <span className="font-semibold">comes down to</span>
        </h2>
        <div>
          <div aria-live="polite" className="min-h-64 rounded-3xl border border-line bg-plate p-8 md:p-12">
            <p className="font-display text-2xl font-light leading-snug md:text-3xl">{s.text}</p>
            <Link href={`/work/${s.slug}/`} className="mt-8 inline-block text-dim hover:text-sand">
              From <span className="text-sand underline decoration-line hover:decoration-accent">{s.title}</span>
            </Link>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <button type="button" onClick={() => go(-1)} aria-label="Previous highlight" className="h-11 w-11 rounded-full border border-line text-sand hover:bg-plate">
              <span aria-hidden="true">&larr;</span>
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next highlight" className="h-11 w-11 rounded-full border border-line text-sand hover:bg-plate">
              <span aria-hidden="true">&rarr;</span>
            </button>
            <span className="ml-2 text-dim tabular-nums">{i + 1} of {slides.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
