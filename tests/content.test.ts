import { describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { getProfile, loadAll } from "../lib/content";
import { parseTask } from "../lib/content/parse";

const TITLES = [
  "Overview & Context", "Problem Statement", "Objectives", "Approach & Execution", "Tools & Technologies",
  "Challenges & Mitigations", "Outcomes & Impact", "Skills Demonstrated", "Resume-Ready Highlights", "Full Task Summary",
];
const FM = (extra = "") =>
  `---\ntask_id: TASK-900\ntitle: "T"\ncategory: "C"\ntags: [a, b]\nrole: "R"\none_line_summary: "S"\n${extra}---\n`;
const body = (over: Record<number, string> = {}) =>
  TITLES.map((t, i) => `## ${i + 1}. ${t}\n\n${over[i + 1] ?? (i === 8 ? "- one\n- two" : "text")}\n`).join("\n");
const ok = FM() + "# T\n\n" + body();

describe("real task files", () => {
  const { tasks, errors } = loadAll();
  it("all 21 load with zero errors", () => {
    expect(errors).toEqual([]);
    expect(tasks).toHaveLength(21);
  });
  it("every section is parsed and non-null", () => {
    for (const t of tasks) for (const [k, v] of Object.entries(t.sections)) expect(v, `${t.meta.taskId} ${k}`).not.toBeNull();
  });
  it("tools, challenges and outcomes parse into structure", () => {
    for (const t of tasks) {
      expect(t.sections.tools!.length, t.meta.taskId).toBeGreaterThan(0);
      expect(t.sections.challenges!.length, t.meta.taskId).toBeGreaterThan(0);
      expect(t.sections.outcomes!.deliverables.length, t.meta.taskId).toBeGreaterThan(0);
      expect(t.sections.outcomes!.value.length, t.meta.taskId).toBeGreaterThan(0);
      expect(t.sections.approach!.phases.length, t.meta.taskId).toBeGreaterThan(0);
    }
  });
});

describe("validation rules", () => {
  it("accepts a complete task; missing status means published", () => {
    const p = parseTask(ok, "TASK-900_x.md");
    expect(p.errors).toEqual([]);
    expect(p.task!.meta.status).toBe("published");
    expect(p.task!.meta.slug).toBe("x");
  });
  it("fails a published task with a mismatched heading", () => {
    const p = parseTask(ok.replace("Problem Statement", "The Problem"), "TASK-900_x.md");
    expect(p.errors.join()).toContain("Section 2");
  });
  it("fails on 6 highlights and names the rule", () => {
    const p = parseTask(FM() + body({ 9: "- 1\n- 2\n- 3\n- 4\n- 5\n- 6" }), "TASK-900_x.md");
    expect(p.errors.join()).toContain("Section 9 has 6 bullets");
  });
  it("fails on an empty required section and on N/A", () => {
    expect(parseTask(FM() + body({ 2: "N/A" }), "TASK-900_x.md").errors.join()).toContain("Section 2");
  });
  it("fails on template placeholders", () => {
    expect(parseTask(FM() + body({ 1: "[ ] fill me" }), "TASK-900_x.md").errors.join()).toContain("placeholder");
  });
  it("downgrades problems to warnings on a draft", () => {
    const p = parseTask(FM("status: draft\n") + body({ 2: "N/A" }), "TASK-900_x.md");
    expect(p.errors).toEqual([]);
    expect(p.warnings.length).toBeGreaterThan(0);
  });
  it("warns, not fails, on a long summary", () => {
    const p = parseTask(ok.replace('one_line_summary: "S"', `one_line_summary: "${"x".repeat(250)}"`), "TASK-900_x.md");
    expect(p.errors).toEqual([]);
    expect(p.warnings.join()).toContain("250 chars");
  });
});

describe("loader", () => {
  it("only reads TASK-NNN_*.md and detects duplicate task ids", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "tasks-"));
    fs.writeFileSync(path.join(dir, "TASK-900_a.md"), ok);
    fs.writeFileSync(path.join(dir, "TASK-901_b.md"), ok);
    fs.writeFileSync(path.join(dir, "TASK-0XX_template.md"), "garbage");
    fs.writeFileSync(path.join(dir, ".secret"), "secret=1");
    const r = loadAll(dir);
    expect(r.tasks).toHaveLength(2);
    expect(r.errors.join()).toContain("Duplicate taskId");
  });
  it("fails on an empty directory", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "tasks-"));
    expect(loadAll(dir).errors.join()).toContain("No TASK-NNN_*.md");
  });
});

describe("profile and privacy", () => {
  it("profile.md parses with experience, education and contact", () => {
    const p = getProfile();
    expect(p.experience[0].groups.length).toBeGreaterThan(0);
    expect(p.education.length).toBeGreaterThan(0);
    expect(p.email).toContain("@");
    expect(p.summary.length).toBeGreaterThan(50);
  });
  it("no phone number appears in website content (it may live only in resume/)", () => {
    // ten or more digits in one run of digits, spaces and dashes looks like a phone number; year ranges do not
    const looksLikePhone = (text: string) => (text.match(/\+?\d[\d\s-]{8,}\d/g) ?? []).some((m) => m.replace(/\D/g, "").length >= 10);
    const files = ["profile.md", ...fs.readdirSync("tasks").map((f) => path.join("tasks", f))];
    for (const f of files) expect(looksLikePhone(fs.readFileSync(f, "utf8")), f).toBe(false);
    expect(looksLikePhone("+91 90000 00000")).toBe(true);
  });
});
