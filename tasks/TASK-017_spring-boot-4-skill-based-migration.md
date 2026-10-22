---
task_id: TASK-017
title: "Skill-Based Major Spring Boot Upgrade and Workflow Engine Migration"
category: "Backend Engineering / Application Modernization"
tags: [spring-boot-4, migration, ai-skills, workflow-engine, camunda, operaton, microservices, modernization]
role: "Backend Engineer"
one_line_summary: "Migrated a microservice application to a new major Spring Boot version using AI skills, reducing effort by 60%, packaged the migration as reusable skills for business projects, and solved a workflow engine migration from Camunda to Operaton."
---

# Skill-Based Major Spring Boot Upgrade and Workflow Engine Migration

## 1. Overview & Context

A microservice application and the framework behind it had to move to a new major version of Spring Boot (version 4). A major upgrade touches every layer, and the business projects built on the framework would each need the same migration later. I performed the upgrade using AI skills and then turned the knowledge into skills those projects could reuse.

## 2. Problem Statement

- A major Spring Boot upgrade changes dependencies, serialization, security, persistence and more across many services.
- Doing it by hand for the framework and again for every dependent business project would be slow and inconsistent.
- The workflow engine in use could not simply be carried over to the new platform version.

## 3. Objectives

- Upgrade the microservice application to Spring Boot 4 with far less effort than a manual migration.
- Capture the migration as reusable skills for the framework's dependent projects.
- Resolve the workflow engine incompatibility.

## 4. Approach & Execution

1. **Skill-based upgrade** — Broke the upgrade into topic-specific skills (dependency version management, auto-configuration changes, JSON library change, web layer, security, persistence, batch, cloud and gateway, logging, externalized configuration) and used them to drive the migration service by service.
2. **Runtime verification** — Added smoke and wire-contract checks so each upgraded service was proven at runtime, not only at build time.
3. **Holding the line** — Added guidance for keeping merged work consistent after the upgrade lands.
4. **Skills for business projects** — Created a dependent-service upgrade skill with its own sub-skills, so any project using the framework can migrate to Spring Boot 4 with the same method.
5. **Workflow engine migration** — Replaced the Camunda workflow engine with Operaton, its open-source continuation. This was a problem that surfaced during the upgrade, and I solved it and captured the procedure as a dedicated migration skill.

## 5. Tools & Technologies

`Spring Boot 4` · `Spring Framework` · `Spring Security` · `Spring Data / Hibernate` · `Spring Batch` · `Spring Cloud` · `Operaton` · `Camunda` · `Maven` · `AI Coding Agent Skills`

## 6. Challenges & Mitigations

| Challenge | Mitigation |
|---|---|
| Breadth of a major upgrade | Topic-specific skills applied systematically |
| Camunda workflow engine not carrying over | Migration to Operaton, documented as a reusable skill |
| Build passing but runtime behaviour changing | Runtime smoke and wire-contract verification |
| Consistency after merges | Explicit guidance for maintaining upgraded state |
| Many dependent projects needing the same upgrade | Reusable upgrade skills for the framework's consumers |

## 7. Outcomes & Impact

**What now exists or works that didn't before:**

- The application running on Spring Boot 4.
- A set of reusable upgrade skills for business projects on the framework.
- A working Operaton-based workflow engine and a skill describing the migration.

**Value delivered:**

- Upgrade effort reduced by 60%.
- Dependent projects migrate with a documented, repeatable method.

## 8. Skills Demonstrated

- Major framework version migration
- Applying AI agents to engineering migrations
- Workflow engine migration
- Knowledge capture as reusable assets
- Runtime verification

## 9. Resume-Ready Highlights

- Migrated a microservice application to Spring Boot 4 using AI skills, reducing migration effort by 60%.
- Created reusable skills so business projects on the framework can migrate to Spring Boot 4 with the same method.
- Solved a workflow engine migration from Camunda to Operaton and captured it as a skill.

## 10. Full Task Summary

I performed a skill-based migration of a microservice application to Spring Boot 4, reducing effort by 60%, by breaking the upgrade into topic-specific skills and verifying each service at runtime. I then created skills that business projects built on the framework can use for their own migration to Spring Boot 4. One notable problem was migrating the workflow engine from Camunda to Operaton, which I solved and documented as a dedicated skill.
