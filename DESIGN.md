---
name: Vishal Rai Portfolio
description: A dark, cinematic screening of one engineer's work, with a calm readable reel for skimmers.
colors:
  ground: "oklch(0.155 0.025 215)"
  plate: "oklch(0.205 0.03 215)"
  plate-raised: "oklch(0.26 0.034 215)"
  sand: "oklch(0.94 0.02 85)"
  sand-dim: "oklch(0.76 0.025 85)"
  vermilion: "oklch(0.7 0.18 40)"
  ground-light: "oklch(0.97 0.012 85)"
  plate-light: "oklch(0.94 0.015 85)"
  ink-light: "oklch(0.2 0.03 215)"
  vermilion-light: "oklch(0.48 0.19 38)"
typography:
  display:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.15rem, 5.4vw, 5.25rem)"
    fontWeight: 300
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3.75rem)"
    fontWeight: 300
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.25
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  sm: "4px"
  pill: "9999px"
  plate: "1.25rem"
  panel: "1.5rem"
spacing:
  section: "10rem"
  gutter: "1.5rem"
  stack: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.vermilion}"
    textColor: "{colors.ground}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-secondary:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.sand}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  plate:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.sand}"
    rounded: "{rounded.panel}"
    padding: "32px"
  nav-pill:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.sand}"
    rounded: "{rounded.pill}"
    padding: "8px 8px 8px 20px"
---

# Design System: Vishal Rai Portfolio

## Overview

**Creative North Star: "The Screening Room"**

The site is a screening, not a brochure. Twenty-one projects are cut like a film: a teal-black grade, warm sand type, and a single vermilion that only ever means "act here". The home page is the trailer, with scroll-driven motion and an asymmetric hero. Every inner page is the reading room: restrained, print-ready, and quiet so the work carries it.

**Key Characteristics:**
- One saturated colour, used only for the primary action, focus and list markers.
- Extreme weight contrast in the display face: light for the connective words, semibold for the claim.
- Plates (stacked, bordered, softly raised surfaces) are the only container.
- Motion lives on the home page only and disappears under reduced motion.

## Colors

A cool teal-black ground with warm sand text is the cinematic grade; vermilion is the warm counter-note.

- **Teal-Black Ground** (`oklch(0.155 0.025 215)`): the page.
- **Plate** (`oklch(0.205 0.03 215)`) and **Raised Plate** (`oklch(0.26 0.034 215)`): surfaces one and two steps above the ground.
- **Warm Sand Text** (`oklch(0.94 0.02 85)`) and **Dim Sand Text** (`oklch(0.76 0.025 85)`): headings and reading text.
- **Projector Vermilion** (`oklch(0.7 0.18 40)`): the single accent.

**The One Accent Rule.** Vermilion marks an action or a focus state and nothing else. It is never used for decoration or large fills.

The print stylesheet uses plain black on white (`#111`, `#333`, `#fff`, `#ccc`, `#f3f3f3`) with a dark rust accent (`#8a2c0d`) so the resume prints cleanly.

A light theme swaps to a warm paper ground with ink text and a deeper vermilion for contrast; the resume print stylesheet forces black on white.

## Typography

**Display font:** Outfit (variable), with system sans fallback.
**Body font:** Geist, with system sans fallback.

Headings use weight 300 for connective words and 600 for the claim inside the same line. Body copy holds a 65 to 68 character measure at 1.65 line height. Hero display type is capped at 5.25rem so the headline stays within three lines.

**The Two-Weight Line Rule.** A display headline mixes one light run and one semibold run. Never set a whole headline in one mid weight.

## Layout

Wide editorial containers (up to 80rem) with asymmetric splits: five parts to seven on the outcomes section, an offset hero with a fan of plates in the lower right. Sections are separated by 7 to 12rem of vertical space so each reads as a chapter. The floating pill navigation sits above all content. Below 1024px every multi-column arrangement becomes a single column and the accordion stacks open.

## Elevation & Depth

Depth is tonal first: ground, plate, raised plate. Only the hero plate fan carries a soft offset shadow (`0 18px 40px -18px rgb(0 0 0 / 0.6)`). A fixed film-grain noise layer at 7% opacity sits over the whole page.

## Shapes

Inline code and focus rings use a 4px radius. Pills for every action and for navigation; 1.25 to 1.5rem radius for plates; 1px hairline borders in a low-contrast teal. Authored SVG artifacts (a pipeline, a cluster) sit inside pill outlines in the headline.

## Components

- **Primary button:** vermilion pill with ink text, lifts 2px on hover.
- **Secondary button:** outlined pill, fills to plate on hover.
- **Plate:** bordered, rounded surface that holds a project, an outcome or a highlight.
- **Accordion slice:** horizontal slices that expand on hover or keyboard focus, stacked and open on small screens.
- **Filter chip:** outlined pill; filled vermilion when pressed.
- **Navigation pill:** floating, solid, with a functional backdrop blur over scrolling content.

## Do's and Don'ts

**Do**
- Do keep all motion on the home page, from visible defaults, and off under `prefers-reduced-motion`.
- Do write copy only from the task files; every number on the site comes from them.
- Do keep inner pages restrained so they print and skim well.

**Don't**
- Don't use stock photography or invented imagery; use authored SVG.
- Don't add eyebrow labels, section numbers or gradient text.
- Don't introduce a second accent colour.
