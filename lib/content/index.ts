import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { parseTask } from "./parse";
import type { Profile, Ranked, Task } from "./types";

export type { Profile, Ranked, Task } from "./types";

// Only files named TASK-NNN_*.md are content; templates, notes and secrets are never picked up.
const FILE = /^TASK-\d{3}_.+\.md$/;
export const TASKS_DIR = path.resolve(process.env.CONTENT_DIR ?? "tasks");

export interface Loaded {
  tasks: Task[];
  errors: string[];
  warnings: string[];
}

export function loadAll(dir = TASKS_DIR, includeDrafts = process.env.INCLUDE_DRAFTS === "true"): Loaded {
  if (!fs.existsSync(dir)) return { tasks: [], errors: [`Content directory not found: ${dir}`], warnings: [] };
  const files = fs.readdirSync(dir).filter((f) => FILE.test(f)).sort();
  const errors: string[] = [];
  const warnings: string[] = [];
  const tasks: Task[] = [];
  if (!files.length) errors.push(`No TASK-NNN_*.md files in ${dir}`);

  for (const f of files) {
    const p = parseTask(fs.readFileSync(path.join(dir, f), "utf8"), f);
    errors.push(...p.errors);
    warnings.push(...p.warnings);
    if (p.task && (p.task.meta.status === "published" || includeDrafts)) tasks.push(p.task);
  }
  for (const key of ["taskId", "slug"] as const) {
    const seen = new Set<string>();
    for (const t of tasks) {
      if (seen.has(t.meta[key])) errors.push(`Duplicate ${key}: ${t.meta[key]}`);
      seen.add(t.meta[key]);
    }
  }
  tasks.sort((a, b) => a.meta.taskId.localeCompare(b.meta.taskId));
  return { tasks, errors, warnings };
}

// A broken checkout or template drift must fail the build loudly instead of shipping a thin site.
let memo: Task[] | undefined;
export function getAllTasks(): Task[] {
  // ponytail: no cache outside production so a new file shows up on refresh in dev
  if (memo && process.env.NODE_ENV === "production") return memo;
  const { tasks, errors } = loadAll();
  if (errors.length) throw new Error(`Content validation failed:\n${errors.join("\n")}`);
  return (memo = tasks);
}

export const getTask = (slug: string) => getAllTasks().find((t) => t.meta.slug === slug);

const group = (tasks: Task[], pick: (t: Task) => string[] | null | undefined): Ranked[] => {
  const map = new Map<string, Ranked>();
  for (const t of tasks)
    for (const name of new Set(pick(t) ?? [])) {
      const key = name.toLowerCase();
      const hit = map.get(key) ?? { name, tasks: [] };
      hit.tasks.push(t);
      map.set(key, hit);
    }
  return [...map.values()].sort((a, b) => b.tasks.length - a.tasks.length || a.name.localeCompare(b.name));
};

export const getTools = () => group(getAllTasks(), (t) => t.sections.tools);
export const getSkills = () => group(getAllTasks(), (t) => t.sections.skills);
export const getTags = () => group(getAllTasks(), (t) => t.meta.tags);
export const getCategories = () => group(getAllTasks(), (t) => [t.meta.category]);

export function getRelated(task: Task, n = 3): Task[] {
  const mine = new Set([...task.meta.tags, ...(task.sections.tools ?? [])].map((x) => x.toLowerCase()));
  return getAllTasks()
    .filter((t) => t.meta.taskId !== task.meta.taskId)
    .map((t) => ({ t, score: [...t.meta.tags, ...(t.sections.tools ?? [])].filter((x) => mine.has(x.toLowerCase())).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((x) => x.t);
}

// Plain text only, never HTML, to keep the client search index small.
export const getSearchIndex = () =>
  getAllTasks().map((t) => ({
    id: t.meta.slug,
    title: t.meta.title,
    category: t.meta.category,
    tags: t.meta.tags.join(" "),
    tools: (t.sections.tools ?? []).join(" "),
    summary: t.meta.oneLineSummary,
  }));

const ProfileSchema = z.object({
  name: z.string(),
  title: z.string(),
  headline: z.string(),
  tagline: z.string(),
  years: z.string(),
  location: z.string(),
  email: z.string().email(),
  links: z.array(z.object({ label: z.string(), url: z.string().url() })),
  stack: z.array(z.string()),
  role: z.string(),
  company: z.string(),
  period: z.string(),
  focus: z.array(z.object({ name: z.string(), text: z.string() })),
  groups: z.array(z.object({ name: z.string(), items: z.array(z.object({ lead: z.string(), text: z.string() })) })),
  skills: z.array(z.object({ area: z.string(), items: z.array(z.string()) })),
  education: z.array(z.object({ school: z.string(), degree: z.string(), period: z.string() })),
  languages: z.array(z.object({ name: z.string(), level: z.string() })),
});

export function getProfile(file = path.resolve("profile.md")): Profile {
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const p = ProfileSchema.safeParse(data);
  if (!p.success) {
    const issues = p.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("\n");
    throw new Error(`profile.md is invalid:\n${issues}`);
  }
  return { ...p.data, summary: content.trim() };
}

// "DevOps Automation / Database Release Engineering" groups under "DevOps Automation"
export const discipline = (t: Task) => t.meta.category.split("/")[0].trim();
export const getDisciplines = () => group(getAllTasks(), (t) => [discipline(t)]);

const firstValue = (t: Task) => t.sections.outcomes?.value[0] ?? "";
export const leadMetric = firstValue;

// Flagged tasks win; otherwise the tasks whose first value line carries a percentage.
export function getFeatured(n = 4): Task[] {
  const all = getAllTasks();
  const flagged = all.filter((t) => t.meta.featured);
  return (flagged.length ? flagged : all.filter((t) => /\d+%/.test(firstValue(t)))).slice(0, n);
}
