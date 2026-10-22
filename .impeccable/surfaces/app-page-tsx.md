---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: []
---

# Surface brief: home (scenes) and case studies

Mode: Experience on the home page, Read on case studies.
Audience: recruiters and hiring managers first, engineering leads second. Goal: keep visitors exploring the work and bio.
Constraints: static export; content only from profile.md, resume/resume.md and tasks/; phone number only in resume files; fast scrolling with no animation library.

## Direction contract

THESIS: A developer's repository, not a brochure: the visitor moves through full-screen scenes like files in a well-kept repo. Refuses the long marketing page and the tabbed resume.
OWN-WORLD: GitHub-dark canvas and surfaces, 1px borders, electric-blue accent for action and position, Geist with Geist Mono for real code and data, code colours confined to terminal and code panels.
STORY: Intro terminal says who and where; About gives the summary; Experience switches through the CV groups; Selected work proves results; the explorer invites browsing all 21; Skills, Education and Contact close with a clear way to reach out or download the resume.
FIRST VIEWPORT: Fixed slim header with path-style name, Resume button, Ctrl K search and theme toggle. Left: name at display size, one-line headline, one sentence of summary, Explore my work and Download resume. Right: a zsh panel running whoami, location, stack and project count. Right edge: the scene index.
FORM: Full-screen scenes with mandatory CSS scroll snapping on large screens, a scene index, command palette and live project preview; seed: none (unavailable) because the owner pinned the direction.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
