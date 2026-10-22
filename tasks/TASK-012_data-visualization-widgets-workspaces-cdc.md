---
task_id: TASK-012
title: "Data Visualization Framework with Widgets, Workspaces and Change Data Capture"
category: "Frontend Engineering / Data Visualization"
tags: [react, slickgrid, charts, widgets, workspaces, change-data-capture, logstash, data-visualization]
role: "Full-Stack Engineer"
one_line_summary: "Built a React framework for widgets and workspaces on grid and chart libraries so users can assemble any data visualization of their choice, backed by Logstash-based change data capture that keeps grids and widgets current through data changes and rollbacks."
---

# Data Visualization Framework with Widgets, Workspaces and Change Data Capture

## 1. Overview & Context

Users of a financial application need to look at the same data in many ways: grids, charts and summary views, arranged to suit their own work. On the UI side I worked with React SlickGrid and React chart libraries and built a framework of widgets and workspaces, with a backend and a change data capture pipeline that keep the views accurate as data changes.

## 2. Problem Statement

- Users wanted to choose and arrange their own visualizations instead of fixed screens.
- Grids and charts needed a consistent, reusable way to be built and configured.
- Views had to reflect data changes, and reversals of those changes, seamlessly.

## 3. Objectives

- Provide a widget framework where each visualization is a configurable, reusable unit.
- Provide workspaces so users can compose and save their own sets of widgets.
- Keep grids and widgets in step with data changes and rollbacks through change data capture.

## 4. Approach & Execution

1. **Grid and chart foundation** — Built on React SlickGrid for high-volume tabular data and React chart libraries for graphical views.
2. **Widget framework** — Defined widgets as self-contained visualization units, with an add-widget flow so users can pick from the available types.
3. **Workspaces** — Let users group widgets into workspaces they can switch between, backed by services that store widgets and workspaces and their ownership.
4. **Change data capture** — Used Logstash pipelines to capture database changes and stream them into the search and analytics store behind the views.
5. **Rollback and change handling** — Because changes are captured as they happen, the widgets and grids reflect data changes and rollbacks seamlessly.

## 5. Tools & Technologies

`React` · `SlickGrid` · `Chart Libraries` · `TypeScript` · `Logstash` · `Elasticsearch` · `Spring Boot` · `REST APIs`

## 6. Challenges & Mitigations

| Challenge | Mitigation |
|---|---|
| Large data volumes in grids | SlickGrid as the grid engine |
| Many visualization types needing consistent behaviour | Common widget framework |
| Views drifting from the source data | Change data capture pipelines |
| Users needing personalised layouts | Workspaces that store each user's widget selection |

## 7. Outcomes & Impact

**What now exists or works that didn't before:**

- A widget and workspace framework on the UI and backend.
- User-selectable data visualizations over grids and charts.
- Change data capture keeping views consistent with data changes and rollbacks.

**Value delivered:**

- Users build the views they need without developer involvement.
- New visualizations are added as widgets rather than as new screens.

## 8. Skills Demonstrated

- Data visualization framework design
- React grid and charting libraries
- Change data capture with Logstash
- Full-stack feature delivery

## 9. Resume-Ready Highlights

- Built a widget and workspace framework on React SlickGrid and chart libraries, letting users compose any data visualization of their choice.
- Implemented Logstash-based change data capture so widgets and grids reflect data changes and rollbacks seamlessly.
- Delivered the supporting backend services for widget and workspace storage.

## 10. Full Task Summary

On the UI side I worked with React SlickGrid and chart libraries and created a framework of widgets and workspaces, so users can access and arrange any data visualization of their choice. Backend services store the widgets and workspaces. To keep the views accurate, I implemented change data capture with Logstash, so grids and widgets follow data changes and rollbacks seamlessly.
