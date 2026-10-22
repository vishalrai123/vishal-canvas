---
task_id: TASK-016
title: "Multi-Tenancy Framework with Tenant Data Segregation and Access Control"
category: "Backend Engineering / Platform Architecture"
tags: [multi-tenancy, data-segregation, access-control, spring-boot, liquibase, microservices, tenant-isolation]
role: "Backend Engineer"
one_line_summary: "Built multi-tenancy into a microservice framework so any application adopting it inherits tenant data segregation and tenant-specific access control."
---

# Multi-Tenancy Framework with Tenant Data Segregation and Access Control

## 1. Overview & Context

A microservice framework is used by project teams to build their own business applications, and those applications often need to serve several tenants from one deployment. I provided a detailed multi-tenant setup in the framework so that tenant handling is inherent: any application built on it honours multiple tenants without implementing tenancy itself.

## 2. Problem Statement

- Applications on the framework needed to serve multiple tenants safely from shared infrastructure.
- Tenant data had to be segregated so one tenant could never see another's records.
- Access control had to be managed per tenant.
- Leaving tenancy to each project would produce inconsistent, error-prone implementations.

## 3. Objectives

- Make multi-tenancy a built-in framework capability.
- Segregate data by tenant across all services and schemas.
- Provide and manage tenant-specific access control.
- Keep tenancy transparent to business developers.

## 4. Approach & Execution

1. **Tenant identity and context** — Carried the tenant in the authenticated identity and loaded it into the request context at the start of every call, so every layer knows the current tenant.
2. **Automatic data segregation** — Applied the current tenant as a filter in the shared data-access layer, so queries are restricted to the caller's tenant by default.
3. **Schema design** — Included tenant identification in the data model across services, delivered through versioned database changesets.
4. **Propagation across channels** — Carried tenant context through messaging and batch executions as well as REST calls, so background work runs for the correct tenant.
5. **Tenant-specific access control** — Scoped roles, menus and permissions by tenant, with services to manage tenants and their access.
6. **Inheritance by design** — Placed all of this in the shared framework libraries, so applications adopting the framework are multi-tenant without additional code.

## 5. Tools & Technologies

`Spring Boot` · `Spring Data JPA` · `Spring Security` · `JWT` · `Liquibase` · `JMS Messaging` · `Spring Batch` · `PostgreSQL`

## 6. Challenges & Mitigations

| Challenge | Mitigation |
|---|---|
| Preventing cross-tenant data access | Tenant filter applied centrally in the data-access layer |
| Tenant context outside HTTP calls | Context propagated through messaging and batch jobs |
| Keeping tenancy invisible to business code | Implemented in shared framework libraries |
| Tenant-specific permissions | Roles and menus scoped by tenant |

## 7. Outcomes & Impact

**What now exists or works that didn't before:**

- Built-in multi-tenancy in the framework.
- Tenant-segregated data model and queries.
- Tenant-scoped access control and tenant management.

**Value delivered:**

- Applications adopting the framework are multi-tenant without implementing it.
- A single, consistent approach to tenant isolation.

## 8. Skills Demonstrated

- Multi-tenant architecture
- Data segregation and isolation design
- Access control modelling
- Framework design for reuse
- Database schema design with versioned changesets

## 9. Resume-Ready Highlights

- Designed multi-tenancy into a microservice framework, with tenant context, automatic data segregation and tenant-specific access control.
- Delivered the tenant-aware data model through versioned database changesets across services.
- Made tenancy inherent for every application adopting the framework, including messaging and batch workloads.

## 10. Full Task Summary

I provided a detailed multi-tenant setup in the organization's microservice framework so that any business application built on it honours multiple tenants by default. The tenant is carried in the authenticated identity and applied as a filter in the shared data-access layer, giving data segregation per tenant, and it is propagated through messaging and batch jobs. The data model includes tenant identification through versioned database changesets, and roles, menus and permissions are scoped and managed per tenant, so adopting applications get tenant isolation without writing it themselves.
