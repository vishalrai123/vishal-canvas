"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { toggleTheme } from "./ThemeToggle";

export interface Command {
  label: string;
  group: string;
  // a scene id on the home page, an in-site path, or an external/static URL
  scene?: string;
  path?: string;
  href?: string;
  action?: "theme" | "copy-email";
}

// Ctrl+K / Cmd+K / "/" opens a palette to jump to any scene or project.
export function CommandPalette({ commands, email }: { commands: Command[]; email: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const path = usePathname();
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const [note, setNote] = useState("");

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? commands.filter((c) => `${c.label} ${c.group}`.toLowerCase().includes(s)) : commands;
  }, [q, commands]);

  const open = () => {
    setQ("");
    setI(0);
    setNote("");
    ref.current?.showModal();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && /^(INPUT|TEXTAREA)$/.test(e.target.tagName);
      if ((e.key === "k" && (e.ctrlKey || e.metaKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        open();
      }
    };
    const onOpen = () => open();
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);

  const run = (c: Command) => {
    if (c.action === "theme") toggleTheme();
    if (c.action === "copy-email") {
      navigator.clipboard?.writeText(email);
      setNote(`Copied ${email}`);
      return;
    }
    ref.current?.close();
    if (c.scene) {
      if (path === "/") document.getElementById(c.scene)?.scrollIntoView();
      else router.push(`/#${c.scene}`);
    } else if (c.path) router.push(c.path);
    else if (c.href) window.open(c.href, "_blank", "noopener");
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const n = Math.max(list.length, 1);
    if (e.key === "ArrowDown") setI((i + 1) % n);
    else if (e.key === "ArrowUp") setI((i - 1 + n) % n);
    else if (e.key === "Enter" && list[i]) run(list[i]);
    else return;
    e.preventDefault();
  };

  return (
    <dialog
      ref={ref}
      aria-label="Command palette"
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      className="m-auto mt-[12vh] w-[min(40rem,calc(100vw-2rem))] rounded-xl border border-line bg-surface p-0 text-ink shadow-[0_16px_48px_rgb(1_4_9/0.6)] backdrop:bg-black/50"
    >
      <div className="flex items-center gap-3 border-b border-line px-4 transition-colors focus-within:border-link">
        <span className="font-mono text-link" aria-hidden="true">&gt;</span>
        <input
          autoFocus
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setI(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Jump to a section or project"
          aria-label="Search sections and projects"
          className="min-w-0 flex-1 bg-transparent py-4 font-mono text-sm outline-none placeholder:text-muted focus-visible:outline-none"
        />
        <kbd className="rounded border border-line px-1.5 font-mono text-xs text-muted">esc</kbd>
      </div>
      <ul className="max-h-[50vh] overflow-y-auto p-2" role="listbox" aria-label="Results">
        {list.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No matches for &quot;{q}&quot;</li>}
        {list.map((c, n) => (
          <li key={`${c.group}-${c.label}`} role="option" aria-selected={n === i}>
            <button
              type="button"
              onMouseEnter={() => setI(n)}
              onClick={() => run(c)}
              className={`flex w-full items-center justify-between gap-4 rounded-md px-3 py-2 text-left text-sm ${n === i ? "bg-surface-2 text-ink" : "text-muted"}`}
            >
              <span className="truncate">{c.label}</span>
              <span className="shrink-0 font-mono text-xs text-muted">{c.group}</span>
            </button>
          </li>
        ))}
      </ul>
      {note && <p className="border-t border-line px-4 py-2 font-mono text-xs text-ok" role="status">{note}</p>}
    </dialog>
  );
}

export function PaletteButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-palette"))}
      className="flex h-8 items-center gap-2 rounded-md border border-line px-2.5 text-sm text-muted transition-colors hover:border-muted hover:text-ink"
    >
      <span className="hidden sm:inline">Search</span>
      <kbd className="font-mono text-xs">Ctrl K</kbd>
    </button>
  );
}
