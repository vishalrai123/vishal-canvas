"use client";

import { useEffect, useState } from "react";

export interface SceneRef {
  id: string;
  label: string;
  // scenes that belong to one index entry (the three Experience scenes) share a group
  group: string;
}

// One IntersectionObserver drives everything: the active index entry, the reveal of each scene
// the first time it is seen, and the URL hash. No scroll listeners, no animation library.
export function SceneChrome({ scenes }: { scenes: SceneRef[] }) {
  const [active, setActive] = useState(scenes[0].id);
  // first scene of each group is its index entry
  const groups = scenes.filter((s, i) => scenes.findIndex((x) => x.group === s.group) === i);
  const pos = scenes.findIndex((s) => s.id === active);
  const activeGroup = scenes[pos]?.group;

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.dataset.seen = "true";
          setActive(el.id);
          history.replaceState(null, "", el.id === scenes[0].id ? location.pathname : `#${el.id}`);
        }
      },
      { threshold: 0.45 },
    );
    scenes.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [scenes]);

  return (
    <>
      <div className="fixed inset-x-0 top-14 z-30 h-0.5 bg-line lg:hidden" aria-hidden="true">
        <div className="h-full bg-link transition-[width] duration-300" style={{ width: `${((pos + 1) / scenes.length) * 100}%` }} />
      </div>
      <nav aria-label="Sections" className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
        <ol className="space-y-3">
          {groups.map((g) => {
            const on = g.group === activeGroup;
            return (
              <li key={g.group}>
                <a href={`#${g.id}`} aria-current={on ? "true" : undefined} className="group flex items-center justify-end gap-3">
                  <span className={`font-mono text-xs transition-opacity ${on ? "text-ink opacity-100" : "text-muted opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"}`}>
                    {g.group}
                  </span>
                  <span className={`block h-0.5 rounded-full transition-all ${on ? "w-6 bg-link" : "w-3 bg-line group-hover:bg-muted"}`} />
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
