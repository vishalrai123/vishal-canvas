import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { z } from "zod";
import type { Root, RootContent, List, Table } from "mdast";
import type { Task } from "./types";

const mdParser = unified().use(remarkParse).use(remarkGfm);
const toHtml = unified().use(remarkRehype).use(rehypeStringify);

const TITLES = [
  "Overview & Context",
  "Problem Statement",
  "Objectives",
  "Approach & Execution",
  "Tools & Technologies",
  "Challenges & Mitigations",
  "Outcomes & Impact",
  "Skills Demonstrated",
  "Resume-Ready Highlights",
  "Full Task Summary",
];

const FrontMatter = z.object({
  task_id: z.string().regex(/^TASK-\d{3}$/),
  title: z.string().min(1),
  category: z.string().min(1),
  tags: z.array(z.string()).min(1),
  role: z.string().min(1),
  one_line_summary: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/).optional(),
  // a missing status means published; write `status: draft` to hide a task
  status: z.enum(["draft", "published"]).default("published"),
  featured: z.boolean().default(false),
  organization: z.string().optional(),
  confidential: z.boolean().default(false),
  links: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
  cover: z.string().optional(),
});

const norm = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/\s+/g, " ").trim();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const text = (n: any): string => n.value ?? (n.children ?? []).map(text).join("");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const codes = (n: any): string[] => (n.type === "inlineCode" ? [n.value] : (n.children ?? []).flatMap(codes));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const firstStrong = (n: any): string | undefined =>
  n.type === "strong" ? text(n) : (n.children ?? []).map(firstStrong).find(Boolean);

const render = (nodes: RootContent[]) => {
  const tree = toHtml.runSync({ type: "root", children: nodes } as Root);
  return String(toHtml.stringify(tree));
};
const listItems = (nodes: RootContent[]) => {
  const list = nodes.find((n) => n.type === "list") as List | undefined;
  return (list?.children ?? []).map((li) => text(li).trim()).filter(Boolean);
};
const empty = (nodes?: RootContent[]) =>
  !nodes?.length || text({ children: nodes }).trim().replace(/\.$/, "").toUpperCase() === "N/A";

export interface Parsed {
  task: Task | null;
  errors: string[];
  warnings: string[];
}

export function parseTask(raw: string, file: string): Parsed {
  const { data, content } = matter(raw);
  const fm = FrontMatter.safeParse(data);
  if (!fm.success) {
    const errors = fm.error.issues.map((i) => `${file}: front matter ${i.path.join(".")}: ${i.message}`);
    return { task: null, errors, warnings: [] };
  }
  const f = fm.data;
  const problems: string[] = [];
  const warnings: string[] = [];

  // split the body into the 10 numbered sections, ignoring the H1 and HTML comments
  const sec: Record<number, RootContent[]> = {};
  let cur = 0;
  for (const n of mdParser.parse(content).children) {
    if (n.type === "heading" && n.depth === 2) {
      const m = text(n).match(/^(\d+)\.\s*(.+)$/);
      if (m) {
        cur = Number(m[1]);
        if (norm(m[2]) !== norm(TITLES[cur - 1] ?? "")) {
          problems.push(`${file}: Section ${cur} heading "${m[2]}" should be "${TITLES[cur - 1]}"`);
        }
        sec[cur] = [];
        continue;
      }
    }
    if (n.type === "html" && n.value.trim().startsWith("<!--")) continue;
    if (cur) sec[cur].push(n);
  }

  const s = (i: number) => (empty(sec[i]) ? undefined : sec[i]);
  const html = (i: number) => (s(i) ? render(s(i)!) : null);
  const items = (i: number) => (s(i) ? listItems(s(i)!) : null);

  const toolNodes = s(5);
  const tools = toolNodes ? (codes({ children: toolNodes }).length ? codes({ children: toolNodes }) : listItems(toolNodes)) : null;

  const table = s(6)?.find((n) => n.type === "table") as Table | undefined;
  const challenges = table
    ? table.children.slice(1).map((r) => ({ challenge: text(r.children[0]).trim(), mitigation: text(r.children[1]).trim() }))
    : null;

  let outcomes: Task["sections"]["outcomes"] = null;
  if (s(7)) {
    const out = { deliverables: [] as string[], value: [] as string[] };
    let label: "deliverables" | "value" = "deliverables";
    for (const n of s(7)!) {
      if (n.type === "paragraph" && n.children[0]?.type === "strong") {
        label = /^value/i.test(text(n.children[0]).trim()) ? "value" : "deliverables";
      } else if (n.type === "list") {
        out[label].push(...listItems([n]));
      }
    }
    outcomes = out;
  }

  let approach: Task["sections"]["approach"] = null;
  if (s(4)) {
    const list = s(4)!.find((n) => n.type === "list") as List | undefined;
    const phases = (list?.children ?? []).map(firstStrong).filter((x): x is string => !!x);
    approach = { html: render(s(4)!), phases };
  }

  const summary = s(10) ? { text: text({ children: s(10) }).trim(), html: render(s(10)!) } : null;

  const task: Task = {
    meta: {
      taskId: f.task_id,
      title: f.title,
      slug: f.slug ?? file.replace(/^TASK-\d{3}_/, "").replace(/\.md$/, ""),
      category: f.category,
      tags: f.tags,
      role: f.role,
      oneLineSummary: f.one_line_summary,
      status: f.status,
      featured: f.featured,
      organization: f.organization,
      confidential: f.confidential,
      links: f.links,
      cover: f.cover,
    },
    sections: {
      overview: html(1),
      problem: html(2),
      objectives: items(3),
      approach,
      tools,
      challenges,
      outcomes,
      skills: items(8),
      highlights: items(9),
      summary,
    },
  };

  const t = f.task_id;
  const need: [number, unknown][] = [[1, task.sections.overview], [2, task.sections.problem], [4, approach], [9, task.sections.highlights], [10, summary]];
  for (const [n, v] of need) if (!v) problems.push(`${t}: Section ${n} (${TITLES[n - 1]}) is missing or empty`);
  const h = task.sections.highlights?.length ?? 0;
  if (h && (h < 2 || h > 5)) problems.push(`${t}: Section 9 has ${h} bullets (need 2-5)`);
  if (/\[ \]|^\s*\[[A-Z][^\]]*\]\s*$/m.test(content)) problems.push(`${t}: unfilled template placeholder in body`);
  if (f.one_line_summary.length > 200) warnings.push(`${t}: one_line_summary is ${f.one_line_summary.length} chars (target 200)`);

  return f.status === "published"
    ? { task, errors: problems, warnings }
    : { task, errors: [], warnings: [...warnings, ...problems] };
}
