---
task_id: TASK-010
title: "Reusable Spring Batch Framework with Logging, Rerun Handling and Distributed Execution"
category: "Backend Engineering / Batch Processing"
tags: [spring-batch, remote-partitioning, distributed-execution, restart-rerun, error-handling, messaging, microservices]
role: "Backend Engineer"
one_line_summary: "Implemented a reusable Spring Batch framework for a microservice application, with structured logging, retry and rerun error handling, and distributed partitioned execution, so new batches are wired through configuration and a single descriptor."
---

# Reusable Spring Batch Framework with Logging, Rerun Handling and Distributed Execution

## 1. Overview & Context

A microservice-based financial application needs batch processing such as bulk updates and end-of-day style rollovers, run for multiple tenants and launched by an external job scheduler. I implemented a Spring Batch framework as a shared module that any service can use to wire its own batches, with consistent logging, failure handling and distributed execution built in.

## 2. Problem Statement

- Each batch would otherwise re-implement job wiring, parameter handling and status tracking.
- Failed batches needed a controlled way to be restarted or rerun.
- Large batches needed to be spread across service instances instead of running in a single process.
- Operations needed reliable status, failure and completion information for every run.

## 3. Objectives

- Provide a shared framework so batches are wired with minimal code.
- Implement structured logging and audit of every batch run and failed item.
- Handle errors with retry and rerun support.
- Support distributed execution of large batches.

## 4. Approach & Execution

1. **Shared framework module** — Built a common module, consumed by multiple services, providing job abstractions, a job repository on the database, a console launcher and configuration binding for chunk size, grid size, polling and timeouts.
2. **Descriptor-based wiring** — A team defines a batch by writing one descriptor (job name, process code, partition and item queries, item processing) and adding a configuration entry. A registrar discovers descriptors and builds the jobs automatically.
3. **Execution modes** — Provided pluggable strategies for local (single-process), fork-and-join (distributed with aggregation) and fire-and-forget execution.
4. **Logging and audit** — Recorded run status, per-partition details, execution parameters and each failed item, and ended every job with a status-logging step and a completion report and notification.
5. **Restart and rerun handling** — Determined automatically whether a launch is new, a restart of a failed run (resumes the same run, skipping completed partitions) or a rerun of a completed run (new run). Stuck executions are marked failed before relaunch, and failed runs can be retried or skipped through scheduler actions.
6. **Distributed execution** — Used remote partitioning: a master step splits the work and publishes one message per partition to a queue, and worker instances process partitions in parallel. The master coordinates through the shared job repository, failing the run on a failed partition or timeout.
7. **Scheduler integration** — Batches are launched per tenant from the external job scheduler through a standard command, so any service batch can be scheduled the same way.

## 5. Tools & Technologies

`Spring Batch` · `Spring Boot` · `Remote Partitioning` · `Apache Camel` · `JMS Messaging` · `ZooKeeper` · `PostgreSQL` · `Feign` · `XyOps`

## 6. Challenges & Mitigations

| Challenge | Mitigation |
|---|---|
| Distributing work without a custom coordination service | Remote partitioning with coordination through the shared job repository |
| Telling a restart from a rerun | Automatic execution-type detection from previous run history and identifying parameters |
| Runs stuck after a crash | Stuck executions marked failed before relaunch |
| Visibility of failures in large runs | Failed items and partitions recorded individually, with completion reports |
| Limiting concurrent launches | Distributed semaphore on console launches per service |

## 7. Outcomes & Impact

**What now exists or works that didn't before:**

- A reusable batch framework adopted by multiple services.
- Consistent logging, audit and completion reporting for every batch.
- Restart, rerun and failure handling built in.
- Distributed, partitioned execution across service instances.

**Value delivered:**

- New batches are wired with one descriptor and a configuration entry rather than custom job code.
- Large batches can run in parallel across instances.
- Failed runs recover without manual data fixing.

## 8. Skills Demonstrated

- Spring Batch framework design
- Distributed and partitioned processing
- Failure recovery, restart and rerun design
- Messaging-based coordination
- Operational logging and audit design
- Reusable framework and API design

## 9. Resume-Ready Highlights

- Implemented a reusable Spring Batch framework adopted by multiple microservices, where a batch is wired with a single descriptor and a configuration entry.
- Built restart and rerun handling that detects run type automatically, resumes failed runs without repeating completed partitions and recovers stuck executions.
- Implemented distributed execution using remote partitioning over messaging, coordinated through the shared job repository.
- Added structured logging, per-item failure audit and completion reporting for every batch run.

## 10. Full Task Summary

I implemented a Spring Batch framework as a shared module for a microservice application. Services wire a batch by writing one descriptor and a configuration entry, and the framework supplies job construction, parameter handling, execution modes, logging, failure audit and completion reporting. Failed runs are handled through automatic restart or rerun detection, with stuck executions cleaned up before relaunch. Large batches run distributed through remote partitioning, where a master splits work into partitions published to a queue, workers process them in parallel and the master coordinates through the shared job repository. The framework can be reused by any service that needs batches and is launched uniformly by the external job scheduler.
