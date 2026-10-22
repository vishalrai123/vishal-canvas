# vishal-canvas

A statically exported Next.js portfolio. Every project, resume bullet and skill on the site is generated from the Markdown files in [`tasks/`](tasks/). There is no hand-written project content in the code.

Live site: https://vishalrai123.github.io/vishal-canvas/

## Add a project

1. Copy `templates/task-template.md` to `tasks/TASK-NNN_short-name.md` (three-digit number, unique, never reused).
2. Fill the front matter and all ten sections, keeping the headings exactly as in the template.
3. `git add tasks && git commit && git push`. The workflow validates the file, rebuilds and redeploys. The new project appears on the home page, the work list, the resume and the skills page with no code change.

Only files named `TASK-NNN_*.md` are read. Front matter keys: `task_id`, `title`, `category`, `tags`, `role`, `one_line_summary` (required). Optional: `slug`, `status` (`draft` hides a task; missing means published), `featured`, `organization`, `confidential`, `links`, `cover`. A `period` key is accepted and ignored.

Write tasks as if a former employer will read them: no internal hostnames, credentials, customer, product or project names. Everything published is public.

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
profile.md    name, headline, tagline and links
lib/content/  parser, validation and queries (the only code that reads files)
app/          routes: home, work, case study, resume, skills, about
components/   UI
PRODUCT.md, DESIGN.md, .impeccable/   product and design records
```
