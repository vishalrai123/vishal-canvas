---
task_id: TASK-020
title: "Organization-Wide MCP Servers and Agentic Deployment and Migration Skills"
category: "AI Engineering / Developer Productivity"
tags: [mcp, ai-agents, model-context-protocol, skills, automation, jira, confluence, gitlab, deployment, data-migration]
role: "DevOps & AI Automation Engineer"
one_line_summary: "Built two MCP servers adopted organization-wide for everyday work, plus skills for agentic deployment of the microservice application on DEV and SIT VMs and for migrating Elasticsearch, job and database container data."
---

# Organization-Wide MCP Servers and Agentic Deployment and Migration Skills

## 1. Overview & Context

AI coding agents become far more useful when they can act on the organization's real systems. I built two MCP (Model Context Protocol) servers that are used across the organization in day-to-day work, and a set of skills that let an agent deploy the microservice application and migrate data on its own.

## 2. Problem Statement

- Routine engineering tasks (issue updates, timesheets, documentation, merge requests, job scheduling work) meant switching between several tools.
- Deployments to DEV and SIT virtual machines and data migrations between containers were manual, multi-step and slow.
- Agents had no safe, authenticated way to reach internal systems.

## 3. Objectives

- Give AI agents authenticated access to the organization's engineering tools.
- Make the servers usable by the whole organization, not only by one person.
- Make deployment and data migration agent-driven and repeatable.

## 4. Approach & Execution

1. **Engineering-activity MCP server** — Built a server exposing tools for the issue tracker, wiki and Git hosting: reading and updating issues, logging work, checking timesheets, publishing documentation pages, raising and tracking merge requests and producing a morning digest.
2. **Job-scheduling MCP server** — Built a second server, with a browser UI, that converts job charts, pushes them to the scheduler, runs and monitors them, recovers failed jobs and captures run evidence.
3. **Shared hosting and sign-in** — Deployed both behind a common gateway with directory-based authentication, so the organization shares one deployment with per-user credentials passed per request and nothing stored on the server.
4. **Deployment skills** — Created skills for deploying the microservice application with Docker on DEV and SIT VMs, so an agent can carry out a full deployment.
5. **Data migration skills** — Created skills for migrating Elasticsearch data, job data and vector-database container data, shortening migration time.
6. **Packaging and documentation** — Wrote setup guides for running the servers locally, behind the gateway and on a fresh VM.

## 5. Tools & Technologies

`Model Context Protocol` · `Python` · `Docker` · `nginx` · `LDAP / Active Directory` · `Jira API` · `Confluence API` · `GitLab API` · `XyOps` · `Elasticsearch` · `AI Coding Agent Skills`

## 6. Challenges & Mitigations

| Challenge | Mitigation |
|---|---|
| Authenticating many users safely | Directory-based sign-in at a shared gateway with per-request credentials |
| Servers used locally and shared | Both a local mode and a shared HTTPS mode |
| Corporate directory security constraints | Gateway configured for the directory's account-lockout and TLS requirements |
| Repeating deployments and migrations manually | Skills that encode the full procedure for an agent |

## 7. Outcomes & Impact

**What now exists or works that didn't before:**

- Two MCP servers in organization-wide use.
- A shared, authenticated gateway for them.
- Skills for agent-driven deployment and data migration.

**Value delivered:**

- Everyday engineering tasks completed from within the AI agent.
- Faster deployments and migrations.
- Consistent procedures that do not depend on one person's knowledge.

## 8. Skills Demonstrated

- MCP server design and development
- Enterprise authentication and gateway design
- Agentic workflow and skill design
- Deployment and data migration automation
- Developer productivity engineering

## 9. Resume-Ready Highlights

- Built two MCP servers adopted organization-wide, covering issue tracking, wiki, Git hosting and job-scheduling workflows.
- Deployed them behind a shared gateway with directory-based authentication and per-request credentials.
- Created skills for agentic Docker deployment on DEV and SIT VMs and for migrating Elasticsearch, job and vector-database container data.

## 10. Full Task Summary

I built two MCP servers that the entire organization uses in its day-to-day work: one covering issue tracking, documentation and merge request workflows, the other covering job-scheduling migration, execution and recovery. Both run behind a shared gateway with directory-based authentication. I also created skills that let an AI agent deploy the microservice application with Docker on DEV and SIT VMs and migrate Elasticsearch, job and vector-database container data, speeding up deployment and migration.
