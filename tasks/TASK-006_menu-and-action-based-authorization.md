---
task_id: TASK-006
title: "Menu and Action Based Authentication and Authorization with JWT"
category: "Backend Engineering / Application Security"
tags: [spring-security, jwt, oauth2, auth0, rbac, access-control, authorization-server, microservices]
role: "Backend Engineer"
one_line_summary: "Implemented menu-based authentication and authorization on an in-house authorization server and Auth0, using advanced Spring Security with JWT tokens, security filters and action-level access control across users, menus and roles."
---

# Menu and Action Based Authentication and Authorization with JWT

## 1. Overview & Context

A multi-service financial application needed a consistent way to decide who can sign in, which menus and screens they see, and which operations they can perform. I implemented menu-based authentication and authorization support that works with the organization's in-house authorization server as well as Auth0 as an external identity provider.

## 2. Problem Statement

- Access had to be controlled at several levels at once: user, role, menu, screen and individual operation.
- Every microservice needed to enforce the same rules without duplicating security logic.
- The platform had to support both an in-house authorization server and an external provider.

## 3. Objectives

- Provide an authorization layer covering users, menus, roles and all types of system access control.
- Base authentication on JWT tokens validated consistently by every service.
- Extend access control from menus down to individual actions.
- Support the in-house authorization server and Auth0.

## 4. Approach & Execution

1. **Authentication** — Used the in-house authorization server (OAuth2 and OpenID Connect) to issue signed JWT access tokens carrying identity and tenant claims, with the front end signing in through the same standards-based flow that Auth0 uses.
2. **Resource-server security** — Configured each microservice as a stateless JWT resource server using Spring Security, with a custom authentication converter.
3. **Security filter chain** — Built an ordered chain of security filters: correlation tracking, bearer-token validation, request-context loading (tenant and caller identity), security-context enrichment, access blockade checks and action authorization.
4. **Role-to-action authorities** — Built authorities server-side from the caller's roles and the actions granted to those roles, cached for performance, instead of trusting token-carried permissions.
5. **Menu-based authorization** — Served each user's menu, screen and action hierarchy filtered by their roles, so the interface presents only what the user may access.
6. **Action-based enforcement** — Mapped each request URL to a registered action and returned a denial unless the caller's roles grant it, with exclusions for non-interactive and machine users.
7. **Administration** — Provided management services for users, roles and role-to-action grants, with audit history of grant changes.

## 5. Tools & Technologies

`Spring Security` · `Spring Authorization Server` · `OAuth2 / OpenID Connect` · `JWT` · `Auth0` · `Redis` · `PostgreSQL` · `Liquibase` · `React`

## 6. Challenges & Mitigations

| Challenge | Mitigation |
|---|---|
| Fine-grained control beyond menu visibility | Action-level authorization mapped to request URLs, layered on menus and roles |
| Consistent enforcement across many services | Shared security filter chain used by every service |
| Keeping tokens small and permissions current | Authorities rebuilt from roles and cached, rather than embedded in the token |
| Machine-to-machine callers | Distinct handling for machine users and non-interactive calls |
| Supporting more than one identity provider | Standards-based OIDC flow so the same front end and services work with either |

## 7. Outcomes & Impact

**What now exists or works that didn't before:**

- A JWT-based authorization layer covering users, menus, roles and actions.
- Menu-driven navigation filtered by role.
- Action-level enforcement applied uniformly in every service.
- Support for the in-house authorization server and Auth0.

**Value delivered:**

- Access control managed as data, so permissions change without code changes.
- Security logic written once and reused by all services.
- Audit history of role and permission changes.

## 8. Skills Demonstrated

- Spring Security and OAuth2 / OIDC design
- JWT-based stateless security
- Role-based and action-based access control modelling
- Security filter design
- Identity provider integration
- Secure multi-tenant application design

## 9. Resume-Ready Highlights

- Implemented menu-based authentication and authorization on an in-house authorization server and Auth0 using advanced Spring Security and JWT tokens.
- Built an ordered security filter chain with role-derived authorities and action-level enforcement mapped to request URLs.
- Delivered an access-control layer covering users, menus, roles and all system access types, with administration services and audit history.

## 10. Full Task Summary

I implemented menu-based authentication and authorization support for a multi-service financial application, working with both the organization's in-house authorization server and Auth0. Tokens are JWT-based and validated statelessly by every service using advanced Spring Security. A custom filter chain loads request context, rebuilds authorities from the caller's roles and enforces access at the level of individual actions, while a menu service returns only the menus, screens and actions each role may see. Administration services manage users, roles and grants with audit history. The result is one reusable authorization layer that covers users, menus, roles and every type of system access control.
