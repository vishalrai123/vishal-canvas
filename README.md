# vishal-canvas

A statically exported Next.js portfolio, told as full-screen scenes (intro, about, experience, selected work, all projects, skills, education, contact). Projects come from the Markdown files in [`tasks/`](tasks/); bio, experience, education and contact details come from [`profile.md`](profile.md). There is no hand-written content in the code.

Live site: https://vishalrai123.github.io/vishal-canvas/

## Add a project

1. Copy `templates/task-template.md` to `tasks/TASK-NNN_short-name.md` (three-digit number, unique, never reused).
2. Fill the front matter and all ten sections, keeping the headings exactly as in the template.
3. `git add tasks && git commit && git push`. The workflow validates the file, rebuilds and redeploys. The new project appears in the project explorer, the command palette, the skills counts and the sitemap, with its own case-study page, and no code change.

Only files named `TASK-NNN_*.md` are read. Front matter keys: `task_id`, `title`, `category`, `tags`, `role`, `one_line_summary` (required). Optional: `slug`, `status` (`draft` hides a task; missing means published), `featured`, `organization`, `confidential`, `links`, `cover`. A `period` key is accepted and ignored.

Write tasks as if a former employer will read them: no internal hostnames, credentials, customer, product or project names. Everything published is public.

## Update your bio or CV details

Edit `profile.md` (name, headline, location, email, links, experience, achievements, education, languages, competencies; the body is the summary). It is validated at build time. Never put a phone number in it: a test fails the build if one appears.

## Resume (ATS-friendly)

`resume/resume.md` holds the resume-only content, including the phone number. Run `npm run resume` (Windows, uses Edge to print) to regenerate four files in `public/resume/`: 1-page and 2-page versions, each as PDF and DOCX. The script checks each PDF has the expected page count. Commit the files to publish them; the site links to the PDFs.

## Develop

```bash
npm install
npm run validate   # parse and validate every task file
npm test           # parser, validation and loader tests, including all real tasks
npm run dev        # http://localhost:3000/vishal-canvas/  (drafts: INCLUDE_DRAFTS=true)
npm run build      # validates, then exports to ./out
```

`prebuild` runs the validator, so a broken task file fails the build and the deploy; the site is never published with a half-parsed project. Validation errors name the file, the section and the rule. A one-line summary over 200 characters is a warning, not an error.

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) builds on every push to `main` and publishes `./out` to GitHub Pages. In the repository settings, Pages must use **Source: GitHub Actions**.

The site is served from a project path, so `next.config.ts` sets `basePath` to `/vishal-canvas`. For a user site or a custom domain, build with `NEXT_PUBLIC_BASE_PATH=""` and `NEXT_PUBLIC_SITE_URL=https://your-domain`, and add `public/CNAME`.

## Layout

```
tasks/        the content: one Markdown file per project
templates/    the task template
profile.md    bio, experience, education, skills and contact (no phone)
resume/       resume-only content; npm run resume renders public/resume/
lib/content/  parser, validation and queries (the only code that reads files)
app/          routes: home (scenes), case study per project, 404, sitemap, feed
components/   UI
PRODUCT.md, DESIGN.md, .impeccable/   product and design records
```
