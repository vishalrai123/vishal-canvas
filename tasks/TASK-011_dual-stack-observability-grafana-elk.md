---
task_id: TASK-011
title: "Switchable Observability Framework: Grafana Stack and ELK"
category: "Platform Engineering / Observability"
tags: [observability, grafana, loki, tempo, prometheus, alloy, alertmanager, cadvisor, elk, elasticsearch, logstash, kibana]
role: "DevOps & Platform Engineer"
one_line_summary: "Integrated both a Grafana-based and an ELK-based observability stack into a microservices framework so project teams can choose either at deployment time."
---

# Switchable Observability Framework: Grafana Stack and ELK

## 1. Overview & Context

I work on a microservices framework that project teams use to build their own business applications. Those teams have different observability preferences and existing tooling, so I integrated two complete observability stacks into the framework, a modern Grafana-based stack and the ELK stack, and made the choice a deployment-time decision.

## 2. Problem Statement

- A framework with a single hard-wired observability tool forces every implementing team onto it.
- Teams needed logs, metrics, traces and alerting without building monitoring themselves.
- The observability setup had to be reproducible across deployment environments.

## 3. Objectives

- Provide full logs, metrics, traces and alerting out of the box.
- Support both a Grafana-based and an ELK-based stack.
- Let each project team switch between them at deployment, with no application change.

## 4. Approach & Execution

1. **Grafana stack** — Integrated Grafana for dashboards, Loki for logs, Tempo for distributed traces, Prometheus for metrics, Alertmanager for alert routing, Alloy as the collection agent and cAdvisor for container metrics.
2. **ELK stack** — Integrated Elasticsearch for storage and search, Logstash for log ingestion and processing, and Kibana for exploration and dashboards.
3. **Uniform application telemetry** — Applications emit structured logs, metrics and trace identifiers in one standard way, so either stack can consume the same telemetry.
4. **Deployment-time selection** — Packaged each stack as its own deployment group, selected through an environment setting during deployment.
5. **Dashboards and datasources** — Provisioned dashboards and datasources for logs and metrics so that teams get working views immediately.

## 5. Tools & Technologies

`Grafana` · `Loki` · `Tempo` · `Prometheus` · `Alertmanager` · `Alloy` · `cAdvisor` · `Elasticsearch` · `Logstash` · `Kibana` · `OpenTelemetry` · `Docker Compose`

## 6. Challenges & Mitigations

| Challenge | Mitigation |
|---|---|
| Two stacks serving one application | Common structured telemetry from the application, with the stack decided only at deployment |
| Teams needing different tools | Each stack deployable independently from the same deployment tooling |
| Time to a useful setup | Pre-provisioned dashboards and datasources |

## 7. Outcomes & Impact

**What now exists or works that didn't before:**

- A complete Grafana-based observability stack and a complete ELK stack, both integrated into the framework.
- Selection between them at deployment.
- Logs, metrics, traces and alerting available to every team that adopts the framework.

**Value delivered:**

- Project teams choose their preferred stack without code changes.
- Observability is part of the framework, not rebuilt per project.

## 8. Skills Demonstrated

- Observability architecture (logs, metrics, traces, alerting)
- Platform design for multiple consuming teams
- Deployment automation
- Telemetry standardisation

## 9. Resume-Ready Highlights

- Integrated a Grafana, Loki, Tempo, Prometheus, Alloy, Alertmanager and cAdvisor stack into a microservices framework.
- Integrated an Elasticsearch, Logstash and Kibana stack alongside it, letting implementing teams switch between the two at deployment.
- Standardised application telemetry so either stack consumes the same logs, metrics and traces.

## 10. Full Task Summary

Working on a microservices framework used by multiple project teams, I integrated two complete observability stacks: a Grafana-based one built from Grafana, Loki, Tempo, Prometheus, Alloy, Alertmanager and cAdvisor, and an ELK one built from Elasticsearch, Logstash and Kibana. Applications emit the same structured telemetry regardless of stack, and each stack is packaged as its own deployment group, so a team selects its preferred one during deployment without code changes. The framework therefore delivers logs, metrics, traces and alerting out of the box.
