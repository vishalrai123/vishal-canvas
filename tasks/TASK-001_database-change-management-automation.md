---
task_id: TASK-001
title: "Database Change Management Automation with Liquibase"
category: "DevOps Automation / Database Release Engineering"
tags: [liquibase, database-versioning, ci-cd, rollback, maven-archetype, microservices, shell-automation, mcp]
role: "DevOps & Release Engineer"
one_line_summary: "Took Liquibase from proof-of-concept to production across a legacy monolith and a microservices framework, replacing manually circulated SQL scripts with a pipeline-gated, auditable migration model with generated rollback."
---

# Database Change Management Automation with Liquibase

## 1. Overview & Context

The organization's financial applications run on two platforms: a long-running legacy monolith with one large schema, and a microservices framework where each service owns its own schema. Database changes for both were delivered as SQL scripts circulated by hand. I ran a proof-of-concept on Liquibase and carried it through to full production adoption on both.

## 2. Problem Statement

- No version control over database changes.
- No guaranteed execution order across environments.
- Persistent environment drift between pre-production stages.
- No dependable rollback path; reversal meant hand-written scripts under release pressure.

## 3. Objectives

- Create one auditable, version-controlled source of truth for all database changes.
- Adopt the tool on the live monolith without a disruptive rebuild.
- Enforce strict per-service schema ownership in the microservices platform.
- Automate migration as a gated pipeline stage with dependable rollback.
- Make the standard propagate automatically to every new service.

## 4. Approach & Execution

1. **Proof-of-concept** — Validated Liquibase against the manual process and took it forward to production adoption.
2. **Monolith baselining** — Captured the existing schema as a baseline so live environments were adopted in place, with no rebuild.
3. **Modular changelog hierarchy** — Brought every database object type under a modular changelog structure with enforced authoring conventions.
4. **Cross-platform automation** — Wrapped operations in parallel Bash and Windows batch scripts for an identical single-command workflow on any OS.
5. **Microservices extension** — Gave each service independent changelogs and independent change tracking, enforcing strict schema segregation.
6. **Maven archetypes** — Packaged the setup so newly scaffolded business services start with migration infrastructure and pipeline configuration already wired in.
7. **Pipeline integration** — Made migration a gated pre-deployment stage on both platforms, driven from a single changelog source.
8. **Two-tier rollback** — Provided rollback at feature and release granularity.
9. **Rollback generation** — Integrated the in-house MCP server to generate rollback scripts from forward changesets, since Liquibase provides no rollback logic for most change types.

## 5. Tools & Technologies

`Liquibase` · `Maven` · `Maven Archetypes` · `Bash` · `Windows Batch` · `CI/CD Pipelines` · `MCP Server`

## 6. Challenges & Mitigations

| Challenge | Mitigation |
|---|---|
| Adopting on a live legacy schema without rebuilds | Baselined the existing schema; only new changes flow through the tool |
| Isolating schemas per microservice | Independent changelogs and tracking per service, enforced by the scaffolded structure |
| Rollback routinely skipped as manual work | Generated from forward changesets; authors only review |
| Different operating systems, different results | Equivalent Bash and batch wrappers with one interface |

## 7. Outcomes & Impact

**What now exists or works that didn't before:**

- A single auditable source of truth for all database changes on both platforms.
- Fully automated migration across every pre-production environment.
- Dependable rollback at feature and release level.
- A standard that propagates automatically to every new service.

**Value delivered:**

- Manual script circulation and hand-sequencing removed from releases.
- Environment drift removed through fully automated, ordered migration across pre-production environments.
- Rollback turned from a skipped manual task into a generate-and-review step.

## 8. Skills Demonstrated

- R&D and proof-of-concept through to production adoption
- Database release engineering
- Brownfield tool adoption without disruption
- CI/CD gating and rollback strategy
- Cross-platform automation
- Standardisation through scaffolding

## 9. Resume-Ready Highlights

- Led proof-of-concept and production adoption of Liquibase across a legacy monolith and a microservices framework, replacing manual SQL scripts with a single auditable source of truth.
- Baselined the live schema and organised all object types into a modular changelog hierarchy with enforced conventions, automated with Bash and Windows batch tooling.
- Built Maven archetypes that scaffold new services with per-service schema segregation, change tracking and pipeline configuration pre-wired.
- Integrated migration into CI/CD as a gated stage with feature- and release-level rollback, and used an in-house MCP server to auto-generate rollback scripts from forward changesets.

## 10. Full Task Summary

Database changes across the organization's financial applications were managed through manually circulated SQL scripts, with no version control, no guaranteed execution order, persistent environment drift and no dependable rollback. I ran a proof-of-concept on Liquibase and took it to production, first retrofitting it into the legacy monolith by baselining the existing schema, organising every object type under a modular changelog hierarchy and wrapping operations in Bash and Windows batch automation. I then extended the model to the microservices framework with independent changelogs and tracking per service, and packaged it into Maven archetypes so new services are scaffolded with migration and pipeline configuration already in place. Migration became a gated pre-deployment stage on both platforms with rollback at feature and release level, and the in-house MCP server now generates rollback scripts from forward changesets. The outcome is one auditable source of truth, automated migration across all pre-production environments, dependable rollback, and a standard that reaches every new service automatically.
