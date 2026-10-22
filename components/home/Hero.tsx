import Link from "next/link";
import type { Profile, Task } from "@/lib/content/types";
import { discipline } from "@/lib/content";

// Authored inline SVG artifacts (no raster images): a pipeline and a cluster.
const Pipeline = () => (
  <span className="mx-2 inline-flex h-[0.8em] w-[1.9em] items-center justify-center rounded-full border border-line bg-plate-2 align-middle" aria-hidden="true">
    <svg viewBox="0 0 96 40" className="h-[60%] w-[78%]" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 20h80" className="text-line" />
      <circle cx="12" cy="20" r="6" fill="var(--sand-dim)" stroke="none" />
      <circle cx="40" cy="20" r="6" fill="var(--sand-dim)" stroke="none" />
      <circle cx="68" cy="20" r="6" fill="var(--sand-dim)" stroke="none" />
      <circle cx="88" cy="20" r="6" fill="var(--accent)" stroke="none" />
    </svg>
  </span>
);
const Cluster = () => (
  <span className="mx-2 inline-flex h-[0.8em] w-[1.9em] items-center justify-center rounded-full border border-line bg-plate-2 align-middle" aria-hidden="true">
    <svg viewBox="0 0 96 40" className="h-[62%] w-[70%]">
      {[16, 36, 56, 76].flatMap((x, i) =>
        [10, 30].map((y, j) => <circle key={`${i}-${j}`} cx={x} cy={y} r="5" fill={i === 2 && j === 0 ? "var(--accent)" : "var(--sand-dim)"} />),
      )}
    </svg>
  </span>
);

function Tagline({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\{pipeline\}|\{cluster\}|\*[^*]+\*)/).map((part, i) =>
        part === "{pipeline}" ? (
          <Pipeline key={i} />
        ) : part === "{cluster}" ? (
          <Cluster key={i} />
        ) : part.startsWith("*") ? (
          <span key={i} className="font-semibold">{part.slice(1, -1)}</span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export function Hero({ profile, plates, count }: { profile: Profile; plates: Task[]; count: number }) {
  return (
    <section className="relative px-6 pb-28 pt-36 md:pt-44 lg:pb-40">
      <div className="mx-auto max-w-7xl">
        <h1 className="pointer-events-none relative z-10 max-w-6xl text-[clamp(2.15rem,5.4vw,5.25rem)] font-light">
          <Tagline text={profile.tagline} />
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-dim">{profile.about}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/work/" className="rounded-full bg-accent px-7 py-3.5 font-medium text-on-accent transition-transform hover:-translate-y-0.5">
            See the work ({count})
          </Link>
          <Link href="/resume/" className="rounded-full border border-line px-7 py-3.5 font-medium text-sand transition-colors hover:bg-plate">
            Read the resume
          </Link>
        </div>

        {/* a fan of real featured projects, overlapping the headline's last line on wide screens */}
        <ul data-hero-plates className="mt-14 grid gap-3 sm:grid-cols-3 lg:absolute lg:bottom-4 lg:right-10 lg:z-0 lg:mt-0 lg:block lg:h-[22rem] lg:w-[32rem] lg:gap-0">
          {plates.slice(0, 3).map((t, i) => (
            <li
              key={t.meta.taskId}
              data-hero-plate
              className="lg:absolute lg:left-0 lg:top-0 lg:w-80"
              style={{ ["--i" as string]: i }}
            >
              <Link
                href={`/work/${t.meta.slug}/`}
                className="block h-full rounded-2xl border border-line bg-plate p-5 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.6)] transition-colors hover:bg-plate-2 lg:[transform:translate(calc(var(--i)*3.2rem),calc(var(--i)*5.2rem))_rotate(calc(-3deg+var(--i)*3deg))]"
              >
                <span className="block text-sm text-dim">{discipline(t)}</span>
                <span className={`mt-2 block font-display text-xl font-medium leading-snug ${i < 2 ? "lg:line-clamp-1" : "line-clamp-2"}`}>{t.meta.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
