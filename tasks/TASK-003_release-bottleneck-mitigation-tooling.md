---
task_id: TASK-003
title: "Release Bottleneck Mitigation: Pre-Release Automation Toolkit"
category: "Release Engineering / DevOps Automation"
tags: [release-management, python, jira-api, git, reconciliation, cherry-pick, job-scheduling, reporting, cron]
role: "DevOps & Release Engineer"
one_line_summary: "Built a toolkit of Python tools and scheduled jobs that automate release scoping, change reconciliation, fix-version promotion, commit cherry-picking and daily job anomaly reporting, removing manual effort from pre-release activities."
---

# Release Bottleneck Mitigation: Pre-Release Automation Toolkit

## 1. Overview & Context

Before each release, a regulated financial software organization must establish what is in scope, confirm that approved changes match committed ones, label tickets correctly, cherry-pick commits and check that scheduled jobs are healthy. These checks were manual, spread across several people, and sat on the critical path to release. I built a toolkit that automates them.

## 2. Problem Statement

- Release scope was assembled by tracing tickets, linked tickets and commit history by hand across more than one code base.
- Database changes attached to tickets for approval were never automatically compared with what was committed.
- Fix versions were applied manually, without enforced promotion order and with linked tickets easily missed.
- Cherry-picking commits for a release was a manual, time-consuming task.
- Daily job results on several scheduling platforms had to be collected and chased by hand.

## 3. Objectives

- Remove manual effort from pre-release scoping, verification and labelling.
- Catch discrepancies between approved and committed changes early.
- Enforce environment promotion order in tooling.
- Deliver daily job anomalies to the right people automatically.

## 4. Approach & Execution

1. **Release-scope extractor** — Python tool that resolves ticket IDs from two tracking systems into related tickets, commits and files, driven by fix-version type and a search start date, and exports an Excel report and log.
2. **Change reconciliation** — Compares the XML and SQL change files attached to tickets against the committed database changelog after normalising both, reporting only genuine differences at individual change-set level. Failed tickets stay under re-validation until they pass or are formally excluded, and it can run as a CI pipeline gate.
3. **Fix-version promotion tool** — Applies or removes fix versions in bulk, enforcing the QA, UAT, PROD chain from external configuration and including linked issues and sub-tasks, with an applied/skipped summary.
4. **Cherry-picking scripts** — Automate the cherry-picking of commits for a release.
5. **Daily job reporting** — Cron-scheduled jobs extract each day's report from the JS7, job2do and XyOps job servers and send anomalies to the responsible authorities.

## 5. Tools & Technologies

`Python` · `Jira REST API` · `Git` · `pandas` · `openpyxl` · `PyYAML` · `XML/SQL parsing` · `Jenkins` · `cron` · `JS7` · `job2do` · `XyOps`

## 6. Challenges & Mitigations

| Challenge | Mitigation |
|---|---|
| Same work tracked under different IDs in two systems | Extractor accepts either and resolves to the primary ticket |
| False mismatches from formatting differences | XML and SQL normalised before set comparison |
| Failed tickets forgotten after status changes | Persistent failure history re-validates them until resolved |
| Legitimate exceptions that can never match | Controlled, auditable exclusion list |
| Promotion rules varying by environment | Rules held in external configuration, not code |
| Different job servers exposing data differently | Per-platform extraction feeding one report and alert flow |

## 7. Outcomes & Impact

**What now exists or works that didn't before:**

- Automated, repeatable release scoping.
- Automated approved-versus-committed reconciliation, usable as a pipeline gate.
- Enforced fix-version promotion order with bulk apply and remove.
- Scripted cherry-picking and scheduled daily job anomaly reports.

**Value delivered:**

- Manual pre-release effort reduced to running a tool and reviewing its report.
- Discrepancies between approved and committed changes surfaced automatically as a pre-release check.
- Operational anomalies reach owners proactively.

## 8. Skills Demonstrated

- Release engineering and process automation
- Python tooling against REST APIs and Git
- Data reconciliation and normalisation
- Compliance-oriented, configuration-driven design
- Integration across multiple job-scheduling platforms
- Scheduled monitoring and alerting

## 9. Resume-Ready Highlights

- Built a Python release-scope extractor resolving tickets from two tracking systems into commits and files by fix-version type, eliminating manual scoping across multiple code bases.
- Automated approved-versus-committed change reconciliation by normalising and set-comparing XML and SQL change sets, with persistent failure history, controlled exclusions and CI-gate exit codes.
- Developed a configuration-driven fix-version tool enforcing QA, UAT and PROD promotion order across linked issues and sub-tasks.
- Automated commit cherry-picking and cron-driven daily reporting across JS7, job2do and XyOps, sending anomalies to responsible owners.

## 10. Full Task Summary

Pre-release work in a regulated financial software organization was a recurring bottleneck: scoping releases by hand, confirming that approved database changes matched committed ones, labelling tickets in the right order, cherry-picking commits and checking daily job runs. I built a toolkit of Python tools and scheduled jobs for each. A release-scope extractor turns tickets from two tracking systems into commits and files. A reconciliation tool normalises and compares approved and committed database changes, tracks failures until resolved and can gate a pipeline. A fix-version tool enforces the promotion chain from external configuration, and cherry-picking scripts automate commit selection for a release. Cron jobs pull daily reports from three job servers and send anomalies to the responsible authorities. Together they replaced repetitive manual checks with repeatable, auditable automation.
