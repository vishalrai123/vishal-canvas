"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// All motion on the site lives here, on the home page only, and is off under prefers-reduced-motion.
// Content is visible by default; every tween animates from a visible state.
export function HomeMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-hero-plate]", { y: 70, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.12, delay: 0.15 });
      gsap.utils.toArray<HTMLElement>("[data-plate]").forEach((el) => {
        gsap.fromTo(el, { scale: 0.9, opacity: 0.35 }, { scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 92%", end: "top 55%", scrub: true } });
        gsap.to(el, { scale: 0.96, opacity: 0.25, ease: "none", immediateRender: false, scrollTrigger: { trigger: el, start: "bottom 35%", end: "bottom -10%", scrub: true } });
      });
    });

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const root = document.querySelector<HTMLElement>("[data-pin-root]");
      const left = document.querySelector<HTMLElement>("[data-pin-left]");
      if (!root || !left) return;
      ScrollTrigger.create({
        trigger: root,
        pin: left,
        pinSpacing: false,
        start: "top 120px",
        end: () => `+=${Math.max(0, root.offsetHeight - left.offsetHeight)}`,
      });
    });

    return () => mm.revert();
  }, []);
  return null;
}
