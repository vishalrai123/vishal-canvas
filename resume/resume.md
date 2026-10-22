---
# Resume-only content, written from the task files. Name, email, links, education and languages come from profile.md.
# The phone number lives here and only here; the website never reads it.
phone: "+91 8240485685"
location: Kolkata, India
title: Software Engineer | Java, Spring Boot, Microservices, AWS, Kubernetes

summary:
  short: Software engineer with 3+ years of experience building the platform under FinTech applications - a Spring Boot microservice framework, the AWS and Kubernetes infrastructure it runs on, and the CI/CD pipelines that ship it. Focused on automation with measured results, including 40-60% faster AWS environment creation, 60% less framework-upgrade effort and over 65% less job-migration effort.
  long: Software engineer with 3+ years of experience building the platform under FinTech applications. Designs and builds a Spring Boot microservice framework that business teams build on, with authorization, multi-tenancy, batch processing, notifications, configuration and an API gateway built in. Runs it on AWS and Amazon EKS with Helm, Docker and infrastructure as code, ships it through Jenkins and GitLab pipelines, and observes it with Grafana or ELK. Focused on removing manual effort through database release automation, release tooling, MCP servers and AI-skill driven migrations, with measured results of 30-65% less time or effort.

skills:
  - area: Languages
    items: Java, Python, TypeScript, Bash, Groovy
  - area: Backend
    items: Spring Boot, Spring Security, Spring Cloud (Config, Gateway, Consul), Spring Batch, Spring Data JPA, OAuth2 / OIDC, JWT, Resilience4j, Apache Camel, JMS
  - area: Data
    items: PostgreSQL, Redis, Elasticsearch, Liquibase
  - area: Cloud & DevOps
    items: AWS (CloudFormation, EKS, ECR, S3, EC2, RDS, EFS), Kubernetes, Helm, Docker, Jenkins, GitLab CI, Nexus, HashiCorp Vault
  - area: Observability
    items: Grafana, Prometheus, Loki, Tempo, Alloy, ELK Stack (Elasticsearch, Logstash, Kibana), OpenTelemetry
  - area: Frontend
    items: React, Angular, Module Federation, Redux Toolkit, SlickGrid
  - area: Testing & Tools
    items: JUnit, Mockito, EvoSuite, Randoop, Diffblue Cover, Git, Jira, Confluence, JasperReports, FineReport
  - area: AI & Automation
    items: MCP servers, Claude Code, AI agent skills, XyOps, JS7, job2do

roles:
  - title: Associate Software Developer
    company: NRIFT India Pvt Ltd
    location: Kolkata, India
    period: Aug 2023 - Present
    note: Grade 1 Level 2 since Apr 2025; Grade 1 Level 1, Aug 2023 - Mar 2025.
    short:
      - Built core modules of a Spring Boot microservice framework used by business teams, including menu- and action-level authorization with Spring Security and JWT, inherent multi-tenancy, a Spring Batch framework and an SMTP notification service.
      - Built an API gateway with Redis-backed rate limiting, Consul discovery and Resilience4j circuit breaking, with profile-based configuration and HashiCorp Vault for secrets.
      - Deployed the platform on Amazon EKS from cluster creation onward with Helm, NGINX ingress, cert-manager, HA replicas and namespace segregation; a resource report across about 30 pods supported right-sizing.
      - Codified a multi-client AWS estate in CloudFormation and built a Python template generator on botocore, cutting new environment creation by over 40% and lookalike environment creation by 60%.
      - Built Jenkins (Groovy) and GitLab Runner CI/CD pipelines and centralized Docker deployments from Nexus, S3, ECR and GitLab registries with full release traceability.
      - Took Liquibase from proof of concept to production across a monolith and microservices, with gated migrations and two-tier (feature and release) rollback.
      - Upgraded the framework to Spring Boot 4 with AI agent skills, cutting upgrade effort by 60%, and migrated financial job charts from job2do and JS7 to XyOps, cutting migration and testing effort by over 65%.
      - Built two MCP servers adopted across the organization and Python release tooling for scoping, change reconciliation and fix-version promotion.
      - Integrated switchable Grafana and ELK observability stacks and distributed report execution that processes bulk reports 30% faster.
    long:
      - group: Backend & Microservice Frameworks
        bullets:
          - Implemented menu- and action-level authentication and authorization on an in-house authorization server and Auth0, using Spring Security, JWT, role-derived authorities and an ordered security filter chain.
          - Designed multi-tenancy into the framework, with tenant context, automatic data segregation and tenant-scoped access control inherited by every adopting application.
          - Built a reusable Spring Batch framework where a batch is wired with one descriptor, with automatic restart and rerun handling and distributed execution through remote partitioning over messaging.
          - Built an API gateway with custom filters and Redis-backed rate limiting by IP, user and API, Consul service discovery and Resilience4j circuit breaking.
          - Implemented profile-based configuration with a central config server and HashiCorp Vault for secrets, using least-privilege policies.
          - Designed an event-driven email notification framework over SMTP with a shared payload contract and delivery log.
      - group: Cloud, Kubernetes & DevOps
        bullets:
          - Deployed the microservice platform on Amazon EKS from cluster creation onward, with Helm charts for every workload and manifests maintained across Minikube (DEV, SIT) and EKS (UAT, PROD).
          - Implemented domain and child-domain routing with the NGINX ingress controller, cert-manager and AWS load balancers, HA replicas, log rotation and namespace segregation; a resource report across about 30 pods supported right-sizing and cost savings.
          - Codified a multi-client AWS estate as parameterized CloudFormation templates, cutting new environment creation time by over 40%.
          - Built a Python platform on botocore and the CloudFormation IaC Generator that reverse-engineers live environments into templates, cutting lookalike environment creation time by 60%.
          - Built CI/CD pipelines from scratch with Jenkins (Groovy) and GitLab Runner, and centralized Docker deployments from Nexus, S3, ECR and GitLab registries with versioned, traceable artifacts.
          - Integrated switchable Grafana (Prometheus, Loki, Tempo, Alloy) and ELK observability stacks over standardized telemetry.
      - group: Automation, Release & AI Engineering
        bullets:
          - Led the proof of concept and production adoption of Liquibase across a monolith and microservices, with Maven archetypes for new services, gated migrations and two-tier (feature and release) rollback.
          - Built Python release tooling for release scoping across code bases, approved-versus-committed change reconciliation and fix-version promotion, plus daily job anomaly reports.
          - Upgraded the framework to Spring Boot 4 using AI agent skills, cutting upgrade effort by 60%, and migrated its workflow engine from Camunda to Operaton.
          - Migrated financial job charts from job2do and JS7 to XyOps using AI skills and agent-driven runs, cutting migration and testing effort by over 65%, and built a highly available XyOps scheduler.
          - Built two MCP servers adopted organization-wide, behind a shared gateway with directory-based authentication, and a five-stage agentic development lifecycle with human checkpoints.
      - group: Frontend, Reporting & Quality
        bullets:
          - Contributed to migrating an Angular monolithic frontend to a React micro-frontend framework on Module Federation, and set up Nexus, ECR and GitLab package registries for frontend artifacts.
          - Built a widget and workspace data-visualization framework on SlickGrid and chart libraries, kept current by Logstash-based change data capture.
          - Centralized JasperReports and FineReport servers with distributed, highly available execution, processing bulk reports 30% faster.
          - Automated JUnit generation for a legacy monolith with Mockito after evaluating Randoop, EvoSuite, Amazon Q Developer and Diffblue Cover.
  - title: Associate Software Engineer Intern
    company: NRIFT India Pvt Ltd
    location: Kolkata, India
    period: Oct 2022 - May 2023

results:
  - Over 65% less migration and testing effort moving financial job charts to XyOps.
  - 60% less effort for a major Spring Boot upgrade, packaged as reusable skills for other teams.
  - Over 40% faster new AWS environment creation, and 60% faster lookalike environments.
  - 30% faster bulk report processing through distributed, highly available execution.
---

Rendered by `npm run resume`. Edit the front matter above, then run the command. The 1-page resume is written to `public/resume/vishal-rai-resume.pdf` (linked from the site); all four files (PDF and DOCX of the resume and the 2-page CV) are kept in `resume/files/`.
