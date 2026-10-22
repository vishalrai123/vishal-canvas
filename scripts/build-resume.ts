// Renders the ATS-friendly resume (1 page) and CV (2 pages), each as PDF and DOCX.
// The 1-page PDF is published on the site: public/resume/vishal-rai-resume.pdf.
// All four files (resume and CV, PDF and DOCX) are kept in the repo under resume/files/; HTML intermediates go to resume/build/.
// Content: profile.md (name, contact, education, languages) + resume/resume.md (phone, roles, bullets).
// PDF printing uses a local Chromium browser (Edge by default); set BROWSER_PATH to override.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import matter from "gray-matter";
import { BorderStyle, Document, Packer, Paragraph, TextRun } from "docx";
import { getProfile } from "../lib/content";

type Variant = "resume" | "cv";
interface Role {
  title: string;
  company: string;
  location: string;
  period: string;
  note?: string;
  short?: string[];
  long?: { group: string; bullets: string[] }[];
}

const SITE = path.resolve("public/resume");
const BUILD = path.resolve("resume/build");
const FILES = path.resolve("resume/files");
const BROWSER = process.env.BROWSER_PATH ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const NAVY = "1F3A5F";

const p = getProfile();
const r = matter(fs.readFileSync(path.resolve("resume/resume.md"), "utf8")).data as {
  phone: string;
  location: string;
  title: string;
  summary: { short: string; long: string };
  skills: { area: string; items: string }[];
  roles: Role[];
  results: string[];
};

const linkText = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
const contact = [r.location, r.phone, p.email, ...p.links.map((l) => linkText(l.url))];

// One model drives both renderers so the PDF and DOCX never disagree.
function model(v: Variant) {
  const long = v === "cv";
  return {
    summary: long ? r.summary.long : r.summary.short,
    roles: r.roles.map((role) => ({
      ...role,
      groups: long ? (role.long ?? []) : role.short ? [{ group: "", bullets: role.short }] : [],
    })),
    results: long ? r.results : [],
    education: long ? p.education : p.education.slice(0, 1),
  };
}

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // keep hyphenated terms (cert-manager, 40-60%) on one line so parsers never see "certmanager"
    .replace(/(\S*\w-\w\S*)/g, '<span class="nw">$1</span>');

function html(v: Variant) {
  const m = model(v);
  const tight = v === "resume";
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(p.name)} - ${tight ? "Resume" : "CV"}</title><style>
@page { size: A4; margin: ${tight ? "10mm 13mm" : "13mm 15mm"}; }
/* ligatures off: Calibri's fi/ft/ti glyphs extract as missing characters in ATS parsers */
* { box-sizing: border-box; }
body { margin: 0; font-variant-ligatures: none; font-feature-settings: "liga" 0, "clig" 0, "dlig" 0; font-family: Calibri, Carlito, Arial, sans-serif; font-size: ${tight ? "10pt" : "10.5pt"}; line-height: ${tight ? 1.28 : 1.35}; color: #111; }
h1 { margin: 0; font-size: 21pt; letter-spacing: .02em; color: #${NAVY}; }
.title { margin: 2px 0 3px; font-size: 11pt; color: #333; }
.contact { margin: 0; color: #333; }
h2 { margin: ${tight ? "8px" : "12px"} 0 3px; padding-bottom: 2px; font-size: 10.5pt; letter-spacing: .08em; text-transform: uppercase; color: #${NAVY}; border-bottom: 1px solid #9aa9bb; }
h3 { margin: 6px 0 0; font-size: 10.5pt; }
p { margin: 0; }
ul { margin: 2px 0 0; padding-left: 15px; }
li { margin: 0 0 ${tight ? "1.5px" : "2.5px"}; }
.row { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
.nw { white-space: nowrap; }
.muted { color: #333; }
.group { margin: 5px 0 1px; font-weight: bold; color: #333; }
.skills p { margin: 0 0 1px; }
</style></head><body>
<h1>${esc(p.name)}</h1>
<p class="title">${esc(r.title)}</p>
<p class="contact">${contact.map(esc).join(" | ")}</p>

<h2>Professional Summary</h2>
<p>${esc(m.summary)}</p>

<h2>Technical Skills</h2>
<div class="skills">${r.skills.map((s) => `<p><b>${esc(s.area)}:</b> ${esc(s.items)}</p>`).join("")}</div>

<h2>Professional Experience</h2>
${m.roles
  .map(
    (role) => `<div class="row"><h3>${esc(role.title)}, ${esc(role.company)}</h3><span class="muted">${esc(role.period)}</span></div>
<p class="muted">${esc(role.location)}${role.note ? ` | ${esc(role.note)}` : ""}</p>
${role.groups.map((g) => `${g.group ? `<p class="group">${esc(g.group)}</p>` : ""}<ul>${g.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>`).join("")}`,
  )
  .join("")}
${m.results.length ? `<h2>Key Results</h2><ul>${m.results.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}

<h2>Education</h2>
${m.education.map((e) => `<div class="row"><p><b>${esc(e.degree)}</b>, ${esc(e.school)}</p><span class="muted">${esc(e.period)}</span></div>`).join("")}

<h2>Languages</h2>
<p>${p.languages.map((l) => `${esc(l.name)} (${esc(l.level)})`).join(", ")}</p>
</body></html>`;
}

function docx(v: Variant) {
  const m = model(v);
  const size = v === "resume" ? 20 : 21; // half-points
  const run = (text: string, o: { bold?: boolean; color?: string; size?: number } = {}) => new TextRun({ text, font: "Calibri", size, ...o });
  const heading = (text: string) =>
    new Paragraph({
      spacing: { before: 160, after: 60 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "9AA9BB", space: 1 } },
      children: [run(text.toUpperCase(), { bold: true, color: NAVY })],
    });
  const para = (children: TextRun[], after = 40) => new Paragraph({ spacing: { after }, children });
  const bullet = (text: string) => new Paragraph({ bullet: { level: 0 }, spacing: { after: 30 }, children: [run(text)] });
  const dated = (left: TextRun[], right: string) =>
    new Paragraph({ tabStops: [{ type: "right", position: 10400 }], spacing: { before: 60, after: 20 }, children: [...left, run(`\t${right}`)] });

  const children: Paragraph[] = [
    new Paragraph({ children: [run(p.name, { bold: true, color: NAVY, size: 42 })] }),
    para([run(r.title, { size: 22 })], 20),
    para([run(contact.join(" | "))], 60),
    heading("Professional Summary"),
    para([run(m.summary)]),
    heading("Technical Skills"),
    ...r.skills.map((s) => para([run(`${s.area}: `, { bold: true }), run(s.items)], 20)),
    heading("Professional Experience"),
    ...m.roles.flatMap((role) => [
      dated([run(`${role.title}, ${role.company}`, { bold: true })], role.period),
      para([run(`${role.location}${role.note ? ` | ${role.note}` : ""}`)], 40),
      ...role.groups.flatMap((g) => [...(g.group ? [para([run(g.group, { bold: true })], 20)] : []), ...g.bullets.map(bullet)]),
    ]),
    ...(m.results.length ? [heading("Key Results"), ...m.results.map(bullet)] : []),
    heading("Education"),
    ...m.education.map((e) => dated([run(e.degree, { bold: true }), run(`, ${e.school}`)], e.period)),
    heading("Languages"),
    para([run(p.languages.map((l) => `${l.name} (${l.level})`).join(", "))]),
  ];
  const margin = v === "resume" ? 620 : 740; // twips
  return new Document({
    creator: p.name,
    title: `${p.name} - ${v === "resume" ? "Resume" : "CV"}`,
    sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: margin, bottom: margin, left: margin + 80, right: margin + 80 } } }, children }],
  });
}

const pages = (pdf: Buffer) => (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;

async function main() {
  fs.mkdirSync(SITE, { recursive: true });
  fs.mkdirSync(BUILD, { recursive: true });
  fs.mkdirSync(FILES, { recursive: true });
  const NAMES: Record<Variant, string> = { resume: "vishal-rai-resume", cv: "vishal-rai-CV" };
  const EXPECT: Record<Variant, number> = { resume: 1, cv: 2 };
  let bad = 0;
  for (const v of ["resume", "cv"] as Variant[]) {
    const htmlFile = path.join(BUILD, `${NAMES[v]}.html`);
    // only the 1-page resume PDF is published on the website
    const pdfFile = path.join(v === "resume" ? SITE : FILES, `${NAMES[v]}.pdf`);
    fs.writeFileSync(htmlFile, html(v));
    execFileSync(BROWSER, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${pdfFile}`, pathToFileURL(htmlFile).href], { stdio: "ignore" });
    fs.writeFileSync(path.join(FILES, `${NAMES[v]}.docx`), await Packer.toBuffer(docx(v)));
    if (v === "resume") fs.copyFileSync(pdfFile, path.join(FILES, `${NAMES[v]}.pdf`));
    const n = pages(fs.readFileSync(pdfFile));
    console.log(`${NAMES[v]}: PDF ${n} page(s), expected ${EXPECT[v]}`);
    if (n !== EXPECT[v]) bad++;
  }
  process.exit(bad ? 1 : 0);
}
main();
