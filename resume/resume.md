---
# Resume-only content. Name, email, links, education, languages and certifications come from profile.md.
# The phone number lives here and only here; the website never reads it.
phone: "+91 8240485685"
location: Kolkata, India
title: Software Engineer | Java, Spring Boot, Microservices, AWS, Kubernetes

summary:
  short: Software Engineer with 2+ years of experience building cloud-native, distributed applications for FinTech. Builds Spring Boot microservices, secure REST APIs and React micro-frontends, and runs them on AWS and Kubernetes (EKS) with Helm, CI/CD and infrastructure as code. Known for automation with measurable results, including 60-70% faster environment provisioning, 60% less framework-upgrade effort and over 65% less migration and testing effort.
  long: Results-driven Software Engineer with 2+ years of experience designing and delivering distributed, cloud-native applications in the FinTech domain. Proven expertise in building Spring Boot microservices, secure REST APIs and React micro-frontends, deployed at scale on AWS and Kubernetes (EKS). Strong background in microservices architecture, API gateway patterns, Spring Security, custom RBAC, multi-tenancy and distributed observability. Experienced in CI/CD automation, infrastructure as code and environment provisioning with Jenkins, Docker, Helm, CloudFormation and Python, and in applying AI coding agents and MCP servers to cut engineering effort across DEV, SIT, UAT and PROD.

skills:
  - area: Languages
    items: Java, Python, SQL, Bash, TypeScript
  - area: Backend
    items: Spring Boot, Spring Cloud (Config, Gateway, Consul), Spring Security, Spring Data JPA, Spring Batch, REST APIs, OAuth2, JWT, Resilience4j
  - area: Databases & Messaging
    items: PostgreSQL, Oracle, MySQL, Redis, Liquibase, JMS
  - area: Cloud & DevOps
    items: AWS (EKS, ECR, S3, RDS, Aurora, EFS, CloudFormation), Docker, Kubernetes, Helm, Jenkins, GitLab CI, Nexus, HashiCorp Vault
  - area: Frontend
    items: React, Micro-Frontends (Webpack Module Federation), Redux Toolkit
  - area: Observability
    items: Grafana, Prometheus, Loki, Tempo, ELK Stack (Elasticsearch, Logstash, Kibana), OpenTelemetry
  - area: Testing & Tools
    items: JUnit, Mockito, Git, Jira, Confluence, JasperReports, FineReport, XyOps, MCP, AI coding agents
  - area: Practices
    items: Microservices, Distributed Systems, RBAC, Infrastructure as Code, CI/CD, Agile, SDLC, Code Reviews
    long_only: true

experience:
  role: Associate Software Engineer II
  company: NRIFT India Pvt Ltd
  location: Kolkata, India
  period: Aug 2023 - Present
  short:
    - Designed and built a Rapid Application Development (RAD) framework for Java Spring Boot microservices on PostgreSQL and Redis, with built-in multi-tenancy, a Spring Batch framework and an email notification service reused by business teams.
    - Implemented secure REST APIs with tenant-, menu- and action-level RBAC using Spring Security, OAuth2 and JWT, behind an API gateway with Redis-backed rate limiting and Consul service discovery.
    - Architected production-grade deployments on Amazon EKS with Helm, NGINX ingress, cert-manager TLS, domain-based routing and HA replicas; a resource report across about 30 pods drove right-sizing and cost savings.
    - Automated AWS environment provisioning with CloudFormation and a Python environment manager, cutting environment setup effort by 60-70%.
    - Built Jenkins and GitLab Runner CI/CD pipelines for backend services and micro-frontends, deploying to DEV (Docker), SIT (Minikube) and PROD (Amazon EKS) with versioned artifacts in Nexus, ECR and GitLab registries.
    - Led the frontend migration from Angular to React micro-frontends (Webpack Module Federation) and integrated switchable Grafana and ELK observability stacks.
    - Upgraded a microservice platform to Spring Boot 4 using AI agent skills, cutting upgrade effort by 60%, and migrated its workflow engine from Camunda to Operaton.
    - Migrated financial job charts from job2do and JS7 to XyOps with agent-driven runs and a job-by-job equivalence workbook, cutting migration and testing effort by over 65%.
    - Introduced Liquibase database change management across a monolith and microservices, with pipeline-gated migrations and feature- and release-level rollback.
  long:
    - group: Application Development & Architecture
      bullets:
        - Designed and built a Rapid Application Development (RAD) framework for distributed microservices using Java Spring Boot, PostgreSQL and Redis, delivering scalable, reusable modules with standardized configuration.
        - Implemented secure REST APIs with multi-level user, tenant, menu and action-based access control using Spring Security, JWT and a custom RBAC framework; integrated OAuth2 for authentication through an in-house authorization server and Auth0.
        - Built inherent multi-tenancy into the framework, with tenant context carried from the token, automatic tenant data segregation in the shared data-access layer and tenant-scoped roles and menus.
        - Built a reusable Spring Batch framework with descriptor-based wiring, restart and rerun handling and distributed execution through remote partitioning over messaging.
        - Designed an event-driven email notification framework over SMTP with a shared payload contract and delivery log, reused across applications.
        - Developed profile-based configuration with Spring Cloud Config and HashiCorp Vault for secrets, and an API gateway with Redis-backed rate limiting, Resilience4j circuit breaking and Consul service discovery.
        - Led the frontend migration from legacy Angular to React micro-frontends (Webpack Module Federation) and built a widget and workspace data-visualization framework on SlickGrid and chart libraries.
    - group: Cloud, Kubernetes & Infrastructure (AWS)
      bullets:
        - Architected and deployed production-grade microservices on Amazon EKS, standardizing deployments with Helm and implementing NGINX ingress, load balancing, domain and child-domain routing and automated TLS with cert-manager.
        - Segregated workloads into application, shared-store and operations namespaces with HA replicas and log rotation; a resource report across about 30 pods identified eviction risk and supported right-sizing and cost savings.
        - Codified a multi-client AWS estate (EC2, EBS, EFS, VPC, RDS, CloudWatch) as parameterized CloudFormation templates, cutting new environment creation time by over 40%.
        - Built a Python platform on botocore and the CloudFormation IaC Generator that reverse-engineers live environments into templates, cutting setup effort for lookalike environments by 60-70%.
        - Centralized reporting on JasperReports and FineReport servers with distributed, highly available execution, processing bulk reports 30% faster.
    - group: DevOps, CI/CD & Release Automation
      bullets:
        - Built and maintained end-to-end CI/CD pipelines with Jenkins (Groovy), GitHub/GitLab and GitLab Runners for backend and frontend applications, and modernized legacy monolith pipelines with additional automation.
        - Designed environment-aware deployments for DEV (Docker), SIT (Minikube) and PROD (Amazon EKS), with images and artifacts versioned and traceable in Nexus, Amazon ECR and GitLab Package Registry.
        - Took Liquibase from proof of concept to production across a monolith and microservices, with modular changelogs, Maven archetypes for new services, pipeline-gated migrations and two-tier rollback.
        - Built Python release tooling, including a JIRA Issue Extractor integrating JIRA, Git and Confluence APIs, a database change reconciliation gate and a fix-version promotion tool, removing manual pre-release effort.
        - Integrated switchable observability stacks, Grafana (Prometheus, Loki, Tempo, Alloy) or ELK, selectable at deployment time by implementing teams.
    - group: Developer Productivity & AI Engineering
      bullets:
        - Upgraded a microservice platform to Spring Boot 4 using AI agent skills, cutting upgrade effort by 60%, packaged the method as reusable skills for dependent teams and migrated the workflow engine from Camunda to Operaton.
        - Migrated financial job charts from job2do and JS7 to XyOps using agent-driven runs and a job-by-job equivalence workbook, cutting migration and testing effort by over 65%, and set up a highly available XyOps cluster.
        - Built two MCP servers for engineering workflows (Jira, Confluence, GitLab) and job scheduling, adopted across the organization behind a shared, directory-authenticated gateway.
        - Designed a five-stage agentic development lifecycle with human checkpoints and an audit trail that helps developers ramp up quickly in a new team.
        - Automated JUnit generation for a legacy monolith with Mockito, evaluating Randoop, EvoSuite, Amazon Q Developer and Diffblue Cover, and published developer guides.

achievements:
  short:
    - Shining Star Employee (Best of the Quarter) for DevOps automation that cut environment provisioning time by 60-70% using AWS CloudFormation.
    - Deployed and managed a production-grade application on Amazon EKS.
    - Built two MCP servers adopted across the organization for day-to-day engineering work.
  long:
    - Shining Star Employee (Best of the Quarter) for DevOps automation that cut environment provisioning time by 60-70% using AWS CloudFormation.
    - Deployed and managed a production-grade application on Amazon EKS.
    - Built this portfolio, a statically generated Next.js site whose projects and resume entries come from Markdown files; adding a file publishes a project automatically.
---

Rendered by `npm run resume`. Edit the front matter above, then run the command to regenerate the PDF and DOCX files in `public/resume/`.
