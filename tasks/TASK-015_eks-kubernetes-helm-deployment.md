---
task_id: TASK-015
title: "Microservice Platform Deployment on Amazon EKS with Helm"
category: "Cloud Infrastructure / Kubernetes Platform Engineering"
tags: [kubernetes, amazon-eks, helm, minikube, ingress-nginx, cert-manager, load-balancer, high-availability, logging, namespaces, cost-optimization]
role: "DevOps & Platform Engineer"
one_line_summary: "Took a microservice application from the basics of cluster creation to a production-grade Amazon EKS deployment with Helm charts, domain-based routing, HA replicas, log rotation, namespace segregation and a pod resource report supporting right-sizing and cost savings."
---

# Microservice Platform Deployment on Amazon EKS with Helm

## 1. Overview & Context

The organization's microservice application, together with its backing stores, monitoring stack and two remote applications, needed to run on Kubernetes across a full environment ladder: Minikube for DEV and SIT, and Amazon EKS for UAT and PROD. I carried this end to end, from creating and setting up the cluster to Helm packaging, ingress, certificates, high availability, logging and capacity analysis. This was a large effort, so it is described below as six sub-tasks.

## 2. Problem Statement

- The application ran on Docker hosts and had no Kubernetes definition.
- There was no cluster, no packaging and no domain-based access for the application, operations and authentication endpoints.
- Replica handling, restarts and log growth had to behave predictably in a highly available setup.
- Resource requests and limits across the pods had not been reviewed, leaving eviction risk and wasted capacity.

## 3. Objectives

- Stand up and configure the cluster, starting from the basics.
- Package every workload as Helm charts and maintain manifests across Minikube and EKS.
- Expose the application, operations and authentication endpoints on domain and child-domain names with certificates.
- Run with replicas that stay highly available through restarts and rollouts.
- Provide proper log rotation and routing, and segregate workloads by namespace.
- Quantify resource use to support right-sizing and cost savings.

## 4. Approach & Execution

1. **Sub-task A: Cluster creation and setup** — Created and configured the cluster from first principles: node and storage setup, storage classes, access to AWS services through service-account-based roles, and the base tooling needed to operate it.
2. **Sub-task B: Helm charts and manifests** — Wrote Helm charts for every service, backing store and operations component, and maintained Kubernetes manifests across Minikube (DEV, SIT) and EKS (UAT, PROD). Improved Helm and `kubectl` rollout efficiency with start and stop scripts that apply workloads in dependency order.
3. **Sub-task C: Ingress, certificates and domains** — Deployed current releases of the NGINX ingress controller, cert-manager and AWS load balancers, with DNS automation. Mapped separate domains and child domains for the application, operations and authentication endpoints, with automatic certificate issuance.
4. **Sub-task D: High availability and rollouts** — Configured replicated workloads and wrote a replica and HA test strategy, so replica counts are honoured cleanly on restarts and rollouts, with testing planned at pod level within the existing cluster capacity.
5. **Sub-task E: Logging and namespace segregation** — Implemented industry-standard log rotation and routing, with size-capped file logs and structured logs shipped to the logging stack. Segregated the platform into separate namespaces for the application, shared backing stores and operations tooling, with fully qualified names for cross-namespace communication.
6. **Sub-task F: Remote applications and resource report** — Deployed two remote applications, an AI service and an assistant application, including their frontends and their connections to shared stores and monitoring. Wrote a pod resource usage report covering about 30 pods that identifies pods with no resource limits, which are evicted first under pressure, and supports right-sizing and cost savings.

## 5. Tools & Technologies

`Amazon EKS` · `Kubernetes` · `Helm` · `Minikube` · `kubectl` · `NGINX Ingress Controller` · `cert-manager` · `AWS Load Balancer` · `ExternalDNS` · `Amazon EBS` · `IAM Roles for Service Accounts` · `Amazon ECR` · `Grafana` · `Loki` · `Prometheus`

## 6. Challenges & Mitigations

| Challenge | Mitigation |
|---|---|
| Many services with startup dependencies | Dependency-ordered start scripts and namespace-aware tooling |
| Domain, child-domain and certificate management | Ingress controller with cert-manager and DNS automation |
| Honouring replicas across restarts and rollouts | Replica configuration with a documented HA test strategy |
| Log growth in long-running pods | Size-capped log rotation with centralised routing |
| Unknown eviction risk and over-allocation | Pod resource usage report highlighting pods without limits |
| Maintaining one deployment across Minikube and EKS | Shared charts with environment-specific values |

## 7. Outcomes & Impact

**What now exists or works that didn't before:**

- A complete EKS deployment, packaged as Helm charts, with Minikube parity for DEV and SIT.
- Domain-based access for application, operations and authentication endpoints with automated certificates.
- Replicated, restart-safe workloads and rotated, centrally routed logs.
- Three-way namespace separation and two remote applications running with their frontends.
- A pod resource usage report covering about 30 pods.

**Value delivered:**

- A repeatable path from cluster creation to a running environment.
- Visible eviction risk and a basis for right-sizing and cost savings.
- Consistent behaviour across DEV, SIT, UAT and PROD.

## 8. Skills Demonstrated

- Kubernetes cluster setup and operations
- Helm chart design and release efficiency
- Ingress, TLS and DNS design
- High availability and replica management
- Logging and observability on Kubernetes
- Capacity analysis and cost optimisation
- Multi-environment deployment

## 9. Resume-Ready Highlights

- Deployed a microservice application on Amazon EKS from cluster creation onward, with Helm charts for every workload and manifests maintained across Minikube (DEV, SIT) and EKS (UAT, PROD).
- Implemented domain and child-domain routing for application, operations and authentication endpoints using the NGINX ingress controller, cert-manager and AWS load balancers.
- Designed HA replica handling, log rotation and routing, and namespace segregation for the platform, and deployed two remote applications with frontends, shared stores and monitoring.
- Produced a resource usage report covering about 30 pods, identifying pods without limits at eviction risk and supporting right-sizing and cost savings.

## 10. Full Task Summary

I deployed the organization's microservice application to Amazon EKS, starting from the basics of cluster creation and setup and building Helm charts for every workload, with Kubernetes manifests maintained across Minikube for DEV and SIT and EKS for UAT and PROD. I used current releases of the NGINX ingress controller, cert-manager and AWS load balancers to provide domain and child-domain access for the application, operations and authentication endpoints, and set up replicated workloads that honour their replica counts cleanly through restarts, with proper log rotation and routing and namespace segregation. I also deployed two remote applications with their frontends, connected to shared stores and monitoring, and wrote a pod resource usage report covering about 30 pods that flags pods without limits as first to be evicted and supports right-sizing and cost savings.
