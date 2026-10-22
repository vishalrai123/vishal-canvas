---
task_id: TASK-008
title: "Centralized and Flexible Docker Deployment for a Microservice Application"
category: "DevOps Automation / Deployment Engineering"
tags: [docker, docker-compose, nexus, ecr, s3, artifact-management, version-control, traceability, jenkins]
role: "DevOps Engineer"
one_line_summary: "Centralized Docker deployment of a microservice application behind one entry point and modernized it with multiple deployment modes across DEV, SIT and UAT, deploying from artifact repositories, image registries or local builds with versioned, traceable artifacts."
---

# Centralized and Flexible Docker Deployment for a Microservice Application

## 1. Overview & Context

A microservice-based financial application consists of many services that had to be deployed consistently to several environments. I centralized the Docker deployment process and modernized it so the same tooling can deploy from different artifact and image sources across DEV, SIT and UAT.

## 2. Problem Statement

- Deployment of many services was not governed by one common process.
- Different environments and teams needed to deploy from different sources: artifacts, prebuilt images or local builds.
- Without strict versioning, it was hard to know which version of each service was running and where it came from.

## 3. Objectives

- Provide one centralized deployment process for all services.
- Support flexible deployment modes across DEV, SIT and UAT.
- Deploy from artifact repositories and image registries, and from local artifacts for DEV.
- Ensure proper version control and traceability of every artifact.

## 4. Approach & Execution

1. **Single deployment entry point** — Created common scripts and a standard container-compose structure through which every service and service group is started, stopped, rebuilt or recreated, using one pattern across all services.
2. **Environment layering** — Separated common settings from per-environment settings, so DEV, SIT and UAT differ only through environment configuration and profiles.
3. **Artifact-based deployment** — Built service images by fetching application artifacts from Nexus, S3 or the GitLab registry, selected by a single setting, using a standard image build pattern for every service.
4. **Image-based deployment** — Deployed prebuilt images directly from Nexus or ECR, avoiding any rebuild in the target environment.
5. **Local deployment for DEV** — Allowed developers to deploy from artifacts built locally, for fast iteration without publishing.
6. **Pipeline integration** — Exposed the same modes through CI/CD pipelines, selectable by source (artifact or image), action (start, restart, stop) and service group.
7. **Version control and traceability** — Versioned every service artifact and image, with image tags matching artifact versions. Release pipelines bump versions per module, create release tags and apply database release labels in a single transactional run that rolls back on failure, so any deployed version can be traced to its source release.

## 5. Tools & Technologies

`Docker` · `Docker Compose` · `Nexus` · `AWS S3` · `AWS ECR` · `GitLab Registry` · `Jenkins` · `Bash` · `Maven`

## 6. Challenges & Mitigations

| Challenge | Mitigation |
|---|---|
| Many services, many deployment patterns | One entry point and a uniform image and compose pattern for all services |
| Different environments needing different sources | Selectable mode: Nexus, S3 or GitLab registry artifacts, Nexus or ECR images, or local artifacts |
| Knowing exactly which version is deployed | Versioned artifacts and images with matching tags and per-module release tags |
| Release steps leaving partial state on failure | Transactional release run that rolls back on failure |
| Secrets in deployment | Secrets loaded from a secured source at deploy time rather than stored in scripts |

## 7. Outcomes & Impact

**What now exists or works that didn't before:**

- One centralized deployment process for all services.
- Flexible deployment modes across DEV, SIT and UAT.
- Deployment from Nexus, S3 and GitLab registry artifacts, from Nexus and ECR images, and from local artifacts for DEV.
- Versioned, traceable artifacts and images.

**Value delivered:**

- Consistent deployments across environments.
- Faster DEV iteration through local-artifact deployment.
- Clear lineage from a running service back to its release.
- Pipeline-driven deployment available to the wider team.

## 8. Skills Demonstrated

- Container deployment architecture
- Artifact and image registry management
- Release versioning and traceability
- Environment configuration management
- CI/CD pipeline design
- Shell automation

## 9. Resume-Ready Highlights

- Centralized Docker deployment for a microservice application behind common scripts and a uniform compose and image pattern.
- Built flexible deployment modes across DEV, SIT and UAT: from Nexus, S3 and GitLab registry artifacts, from Nexus and ECR images, and from local artifacts for DEV.
- Implemented artifact versioning and release tagging with transactional release pipelines, giving full traceability from deployment back to release.

## 10. Full Task Summary

I centralized the Docker deployment process of a microservice application so every service is deployed through the same scripts and the same compose and image pattern. I then modernized it with flexible deployment modes across DEV, SIT and UAT: deploying from artifacts held in Nexus, S3 or the GitLab registry, from images in Nexus or ECR, and from locally built artifacts for DEV, all selectable by a single setting or through CI/CD pipeline parameters. Every artifact and image is versioned, and release pipelines tag each module and apply database release labels in a transactional run, giving proper version control and traceability from any deployment back to its release.
