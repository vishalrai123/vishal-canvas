---
name: Vishal Rai Portfolio
description: A developer portfolio in GitHub-dark, told as full-screen scenes that switch as you scroll.
colors:
  bg: "#0d1117"
  surface: "#161b22"
  surface-2: "#21262d"
  line: "#30363d"
  ink: "#e6edf3"
  muted: "#8b949e"
  accent: "#1f6feb"
  link: "#58a6ff"
  key: "#d2a8ff"
  str: "#a5d6ff"
  ok: "#3fb950"
  bg-light: "#ffffff"
  surface-light: "#f6f8fa"
  line-light: "#d0d7de"
  ink-light: "#1f2328"
  muted-light: "#59636e"
  accent-light: "#0969da"
  key-light: "#8250df"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 7vw, 5.5rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  list:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 500
    lineHeight: 1.4
  mono:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  code:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  pill: "9999px"
spacing:
  scene: "100svh"
  gutter: "1.5rem"
  stack: "1rem"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 20px"
    height: "44px"
  button-secondary:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 20px"
    height: "44px"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "20px"
  chip:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.muted}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
---

# Design System: Vishal Rai Portfolio

## Overview

**Creative North Star: "The Repository"**

The site reads like a well-kept repository: a GitHub-dark canvas, a terminal that introduces the owner, a `competencies.ts` file for skills, and an index that tracks where you are. Each section is a full-screen scene; on large screens the page snaps from scene to scene, and the content of each scene settles in as it arrives. Case studies are calm reading pages in the same palette.

**Key Characteristics:**
- GitHub-dark neutrals with one electric-blue accent for actions, links and the active index.
- Monospace only where it carries code, commands, paths, counts or labels from the data.
- Full-screen scenes with native CSS scroll snapping; no animation library.
- A command palette (Ctrl K) and a live project preview reward exploration.

## Colors

GitHub's dark palette: canvas `#0d1117`, surface `#161b22`, raised `#21262d`, border `#30363d`, foreground `#e6edf3`, muted `#8b949e`. Electric blue `#1f6feb` fills primary buttons; link blue `#58a6ff` marks links, focus and the active index. Purple `#d2a8ff`, string blue `#a5d6ff` and prompt green `#3fb950` appear only inside code and terminal surfaces. The light theme mirrors GitHub light.

**The One Accent Rule.** Blue is the only colour outside code surfaces. Purple and green never leave the terminal or code panels.

## Typography

**Body and headings:** Geist. **Code, commands, labels, counts:** Geist Mono.

Display uses weight 600 with tight tracking; body copy holds about 70 characters at 1.6 line height. Project list rows use 0.95rem and the code panel 0.8rem so long arrays wrap legibly.

**The Real Code Rule.** Monospace is used for things that are code or data (commands, file names, paths, counts, tool names), never as decoration on prose.

## Layout

Ten scenes, each at least one viewport tall: intro, about, three experience scenes (one per CV group), selected work, all projects, skills, education, contact. Content sits in a 72rem container. On screens at least 1024 by 700 the page uses mandatory scroll snapping; smaller screens scroll freely with a progress bar under the header. A fixed index on the right lists scene groups and highlights the current one.

## Elevation & Depth

Flat and tonal: canvas, surface, raised surface, separated by 1px borders. Only the intro terminal and the command palette carry a soft shadow. A faint blue light follows the pointer on desktop, moved by transform only.

## Shapes

6px radius on buttons, chips and inline code; 12px on panels and cards; pills only for filter chips.

## Components

- **Primary button:** electric-blue fill, white text, 44px tall.
- **Secondary button:** bordered, fills to surface on hover.
- **Panel:** surface fill with a 1px border; used for the terminal, code panel, preview and cards.
- **Chip:** raised fill, monospace muted text, for tools.
- **Filter chip:** bordered pill; link blue when pressed.
- **Scene index:** short bars that grow and turn blue for the active scene; labels show on hover and for the active entry.
- **Command palette:** native dialog with keyboard navigation over sections, projects, resume downloads and contact actions.

## Do's and Don'ts

**Do**
- Do keep every scene within one viewport on common desktop sizes.
- Do drive scroll state with a single IntersectionObserver and CSS transitions.
- Do take every word from profile.md, resume content and the task files.

**Don't**
- Don't create scroll containers around scenes (use overflow clip, not hidden), or snapping breaks.
- Don't use the code colours outside code and terminal surfaces.
- Don't add eyebrow labels, gradient text or stock imagery.
