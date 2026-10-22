---
task_id: TASK-019
title: "Skill-Based Migration of Financial Job Charts to XyOps with HA Scheduler Setup"
category: "DevOps Automation / Job Scheduling"
tags: [xyops, job2do, js7, job-scheduling, migration, ai-agents, high-availability, conductor, automation]
role: "DevOps & Automation Engineer"
one_line_summary: "Migrated industry-adopted financial job charts from job2do and JS7 to XyOps using AI skills, cutting migration and testing effort by more than 65%, proved equivalence with a comparison workbook and built a highly available multi-server XyOps scheduler."
---

# Skill-Based Migration of Financial Job Charts to XyOps with HA Scheduler Setup

## 1. Overview & Context

Financial applications in the organization run their batch schedules as job charts on job2do and JS7, which are widely adopted in the industry. The organization moved these schedules to XyOps. Migrating a full chart by hand, and then proving each job still behaves identically, is slow and error-prone, so I did it with AI skills and agent-driven workflows and built a highly available XyOps platform to run it.

## 2. Problem Statement

- Job charts contain many jobs with dependencies, calendars, parameters and failure handling that must all carry over exactly.
- Manual conversion and testing of each chart consumed large amounts of effort.
- The business needed proof that migrated jobs behave the same as the originals.
- The new scheduler itself had to be highly available.

## 3. Objectives

- Migrate job2do and JS7 job charts to XyOps with minimal manual effort.
- Prove that migrated jobs behave the same as the originals.
- Run jobs, analyse results and produce status reports through agent-driven workflows.
- Build an HA XyOps setup.

## 4. Approach & Execution

1. **Skill-based migration** — Encoded the conversion rules for job charts (jobs, dependencies, calendars, parameters, failure handling) as AI skills, so whole charts, single sheets or individual rows can be converted and pushed to XyOps consistently.
2. **Agent-driven execution** — Used agent workflows to run migrated jobs, analyse the results and produce status reports.
3. **Equivalence proof** — Produced a detailed job2do-versus-XyOps comparison workbook demonstrating, job by job, that the migrated jobs behave the same.
4. **Failure recovery** — Added controls to halt on failure and to retry, skip or rerun jobs, so operations can recover safely.
5. **HA scheduler** — Set up XyOps with multiple servers, server groups and conductors, so scheduling and job execution continue through the loss of a node.

## 5. Tools & Technologies

`XyOps` · `job2do` · `JS7` · `Python` · `AI Coding Agent Skills` · `Excel` · `Docker`

## 6. Challenges & Mitigations

| Challenge | Mitigation |
|---|---|
| Faithful conversion of complex job charts | Conversion rules encoded as reusable skills |
| Proving behavioural equivalence | Job-by-job comparison workbook |
| Reviewing large numbers of run results | Agent-driven analysis and status reports |
| Recovering from failed jobs | Halt-on-failure with retry, skip and rerun controls |
| Single points of failure in scheduling | Multiple servers, server groups and conductors |

## 7. Outcomes & Impact

**What now exists or works that didn't before:**

- Job charts migrated from job2do and JS7 to XyOps.
- A comparison workbook proving the jobs behave the same.
- Agent-driven run, analysis and reporting workflows.
- A highly available XyOps scheduler.

**Value delivered:**

- Migration and testing effort reduced by more than 65%.
- Evidence that migrated jobs are equivalent to the originals.
- A resilient scheduling platform.

## 8. Skills Demonstrated

- Scheduler migration
- AI-agent workflow design
- Test evidence and verification design
- High-availability architecture
- Operational recovery design

## 9. Resume-Ready Highlights

- Migrated financial job charts from job2do and JS7 to XyOps using AI skills, reducing migration and testing effort by more than 65%.
- Built agent-driven workflows to run jobs, analyse results and produce status reports.
- Delivered a detailed job2do-versus-XyOps comparison workbook proving the jobs behave the same.
- Built a highly available XyOps scheduler with multiple servers, server groups and conductors.

## 10. Full Task Summary

I performed a skill-based migration of job2do and JS7 job charts, widely adopted in the financial industry, to XyOps, reducing migration and testing effort by more than 65%. Agent-driven workflows ran the jobs, analysed the results and produced status reports, and a detailed job2do-versus-XyOps comparison workbook proved that the jobs behave the same. I also built a highly available XyOps job scheduler with multiple servers, server groups and conductors.
