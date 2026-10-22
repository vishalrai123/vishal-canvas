import Link from "next/link";
import { getAllTasks, getDisciplines, getFeatured, getProfile, getQuantifiedHighlights } from "@/lib/content";
import { Hero } from "@/components/home/Hero";
import { Disciplines } from "@/components/home/Disciplines";
import { Outcomes } from "@/components/home/Outcomes";
import { HighlightCarousel } from "@/components/home/HighlightCarousel";
import { HomeMotion } from "@/components/home/HomeMotion";

export default function Home() {
  const profile = getProfile();
  const tasks = getAllTasks();
  const featured = getFeatured(4);
  const disciplines = getDisciplines();
  const slides = getQuantifiedHighlights(8).map((h) => ({ text: h.text, title: h.task.meta.title, slug: h.task.meta.slug }));
  return (
    <>
      <HomeMotion />
      <Hero profile={profile} plates={featured} count={tasks.length} />
      <Disciplines groups={disciplines} total={tasks.length} />
      <Outcomes tasks={featured} />
      {slides.length > 0 && <HighlightCarousel slides={slides} />}
      <section className="px-6 py-32 md:py-48">
        <div className="mx-auto max-w-7xl">
          <h2 className="max-w-5xl text-5xl font-light md:text-7xl">
            Read the whole story, <span className="font-semibold">or just the resume.</span>
          </h2>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/work/" className="rounded-full bg-accent px-8 py-4 font-medium text-on-accent transition-transform hover:-translate-y-0.5">
              Browse all {tasks.length} projects
            </Link>
            <Link href="/resume/" className="rounded-full border border-line px-8 py-4 font-medium text-sand transition-colors hover:bg-plate">
              Open the resume
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
