---
task_id: TASK-009
title: "Profile-Based Configuration, Vault Secrets Management and API Gateway for Microservices"
category: "Platform Engineering / Microservice Infrastructure"
tags: [spring-cloud-config, vault, spring-cloud-gateway, consul, resilience4j, rate-limiting, service-discovery, microservices]
role: "DevOps & Backend Engineer"
one_line_summary: "Implemented profile-based configuration management with Vault-backed secrets and an API gateway with custom filters, rate limiting, resilience and Consul-based service discovery for a microservice application."
---

# Profile-Based Configuration, Vault Secrets Management and API Gateway for Microservices

## 1. Overview & Context

A microservice-based financial application runs many services across several environments and deployment targets. Each service needed environment-specific configuration, a safe way to hold secrets, a single entry point for clients and a way to find other services at runtime. I implemented these four capabilities as shared platform infrastructure.

## 2. Problem Statement

- Configuration differed per environment and deployment target, and had to be managed without rebuilding services.
- Secrets such as database credentials should not sit in plain configuration files.
- Clients needed one entry point to many services, protected against excessive traffic.
- Services needed to locate each other dynamically instead of through fixed addresses.

## 3. Objectives

- Manage configuration centrally, selected by profile for each environment.
- Keep secret configuration in a dedicated secrets manager.
- Provide a gateway with filters, rate limiting and resilience.
- Integrate service discovery so routing follows the live set of services.

## 4. Approach & Execution

1. **Profile-based configuration** — Centralized configuration in a config server with a shared base file, per-service files and per-profile overrides for local, development, SIT, UAT, containerized and cloud deployments. Services pick up the right set by active profile and fetch it at start-up, with fail-fast behaviour.
2. **Vault for secrets** — Integrated HashiCorp Vault so services read secret configuration (such as credentials) from a key-value store, using read-only policies for services and separate write access for seeding. Secrets are referenced by placeholder in configuration rather than stored in it.
3. **API gateway** — Implemented a gateway service as the single entry point, with global filters for request tracing and for rate limiting.
4. **Rate limiting** — Built distributed rate limiting on Redis with IP, user and API strategies, per-path limits, excluded paths and standard rate-limit response headers, returning a throttle response when limits are exceeded.
5. **Resilience** — Applied resilience libraries to inter-service communication, with circuit breaking, retry and metrics configured centrally.
6. **Consul integration** — Integrated Spring Cloud Consul so services register with health checks and the gateway routes to them by service name, with routes refreshed automatically as services come and go.

## 5. Tools & Technologies

`Spring Cloud Config` · `HashiCorp Vault` · `Spring Cloud Gateway` · `Spring Cloud Consul` · `Resilience4j` · `Redis` · `OpenTelemetry` · `Docker`

## 6. Challenges & Mitigations

| Challenge | Mitigation |
|---|---|
| One codebase across many environments | Profile-based configuration fetched from a central server |
| Keeping secrets out of configuration | Vault integration with placeholders and least-privilege policies |
| Protecting services from bursts of traffic | Redis-backed rate limiting with per-path and per-strategy limits |
| Internal service calls blocked by limits | Bypass for trusted internal calls |
| Services appearing and disappearing | Consul discovery with health checks and automatic route refresh |
| Failures cascading between services | Circuit breaking and retry on inter-service calls |

## 7. Outcomes & Impact

**What now exists or works that didn't before:**

- Central, profile-driven configuration for every service and environment.
- Vault-managed secret configuration.
- A gateway with tracing, rate limiting and discovery-based routing.
- Resilience on inter-service communication.

**Value delivered:**

- The same build runs in every environment, with behaviour set by profile.
- Secrets are no longer held in configuration files.
- Services are protected from traffic bursts and cascading failures.
- New services become reachable through the gateway without manual route changes.

## 8. Skills Demonstrated

- Externalized configuration and environment management
- Secrets management with Vault
- API gateway design and filter development
- Rate limiting and resilience engineering
- Service discovery and dynamic routing
- Microservice platform architecture

## 9. Resume-Ready Highlights

- Implemented profile-based configuration management with a central config server across local, SIT, UAT, containerized and cloud profiles.
- Integrated HashiCorp Vault for secret configuration, using least-privilege read policies and placeholder-based references.
- Built an API gateway with custom filters and Redis-backed distributed rate limiting by IP, user and API.
- Integrated Spring Cloud Consul for service discovery and automatic route refresh, and applied Resilience4j circuit breaking to inter-service calls.

## 10. Full Task Summary

I implemented the core platform infrastructure for a microservice application. Configuration is managed centrally by profile, so one build serves every environment, and secret configuration lives in Vault rather than in files. A gateway provides the single entry point with global filters for tracing and distributed, Redis-backed rate limiting, while Resilience4j provides circuit breaking and retry on inter-service calls. Spring Cloud Consul registers services with health checks and lets the gateway route by service name, refreshing routes automatically as the live set of services changes.
