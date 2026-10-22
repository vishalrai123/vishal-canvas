---
task_id: TASK-002
title: "AWS Infrastructure-as-Code Automation with CloudFormation"
category: "Cloud Infrastructure / DevOps Automation"
tags: [aws, cloudformation, infrastructure-as-code, python, botocore, iac-generator, disaster-recovery, ami]
role: "DevOps & Cloud Engineer"
one_line_summary: "Codified a multi-client AWS estate as parameterised, conditional CloudFormation templates and built a Python platform that turns live environments into deployable templates, cutting new environment creation by over 40% and lookalike creation by 60%."
---

# AWS Infrastructure-as-Code Automation with CloudFormation

## 1. Overview & Context

The organization's large-scale financial application runs across SIT, UAT, PRE-PROD and PROD, duplicated per client. Client environments differ substantially in traffic profile, DR topology and AWS resource configuration. Each is a significant estate of EC2, EBS, EFS, VPC, subnet, NAT, security group, RDS and CloudWatch resources, all originally provisioned by hand in the console.

## 2. Problem Statement

- No version-controlled definition of any environment.
- Compliance required knowing exactly what was deployed for which client, with no reviewable record to show it.
- Per-client variance risked one-off, divergent copies of infrastructure.
- Short-notice demo environments depended on individual knowledge.
- Some estates had no templates at all and could not be reliably reproduced.

## 3. Objectives

- Define the full multi-client estate as reviewable, diffable code.
- Absorb per-client variance without fragmenting into one-off templates.
- Make short-notice demo environments fast and reliable.
- Bring undocumented, manually built environments under management.

## 4. Approach & Execution

1. **Codification** — Expressed the full estate (compute, storage, network, database and monitoring) as CloudFormation templates.
2. **Variance modelling** — Handled configuration differences through parameterisation and structural differences, such as the presence or absence of a DR site, through conditional provisioning.
3. **Demo environments** — Used the templates with prepared AMIs and integrated data backup and restore to provision complete environments in hours.
4. **Reverse-engineering platform** — Built a Python platform integrating botocore and the AWS CloudFormation IaC Generator to turn any live environment in an account into a runnable template.
5. **Managed input UI** — Let generated templates be adjusted before deployment and new CloudFormation definitions be onboarded through the same pipeline.

## 5. Tools & Technologies

`AWS CloudFormation` · `CloudFormation IaC Generator` · `Python` · `botocore` · `EC2` · `EBS` · `EFS` · `VPC` · `RDS` · `CloudWatch` · `AMI`

## 6. Challenges & Mitigations

| Challenge | Mitigation |
|---|---|
| Clients differ in traffic, DR and resource configuration | Parameters for configuration differences, conditions for structural ones |
| Environments with no templates | Python platform generating templates from live accounts |
| Generated templates needing adjustment before redeploy | Managed input UI to review and edit before deployment |
| Short-notice demos needing realistic data | Prepared AMIs with integrated backup and restore |

## 7. Outcomes & Impact

**What now exists or works that didn't before:**

- A multi-client AWS estate defined entirely in code.
- Provisioning that no longer depends on individual knowledge.
- A repeatable pipeline for capturing existing infrastructure and deploying new environments modelled on it.

**Value delivered:**

- New environment creation time cut by over 40%.
- Lookalike environment creation time cut by 60%.
- A reviewable, diffable record of each client's infrastructure for compliance.

## 8. Skills Demonstrated

- Infrastructure-as-code design
- AWS architecture and DR topology modelling
- Python and AWS SDK automation
- Onboarding legacy, manually built infrastructure
- Self-service provisioning tooling

## 9. Resume-Ready Highlights

- Codified a multi-client AWS estate as CloudFormation templates, using parameters for configuration variance and conditions for structural variance such as DR presence, creating a diffable infrastructure record for compliance.
- Enabled short-notice client demo environments from prepared AMIs with integrated data backup and restore, cutting new environment creation time by over 40%.
- Built a Python platform on botocore and the AWS CloudFormation IaC Generator that reverse-engineers live environments into runnable templates.
- Delivered a managed input UI for adjusting generated templates and onboarding new definitions, cutting lookalike environment creation time by 60%.

## 10. Full Task Summary

The organization's financial application runs across SIT, UAT, PRE-PROD and PROD environments per client, with clients diverging in traffic, DR topology and AWS configuration, and everything had been built manually in the console. I codified the whole estate as CloudFormation templates, using parameterisation for configuration differences and conditional provisioning for structural ones, so one template family serves every client. The templates, with prepared AMIs and integrated backup and restore, made short-notice demo environments a reliable capability and cut new environment creation time by over 40%. For estates with no templates, I built a Python platform on botocore and the CloudFormation IaC Generator that reverse-engineers live environments into runnable templates, with a managed UI for adjusting them and onboarding new definitions, cutting lookalike environment creation time by 60%. The result is a multi-client AWS estate defined in code and a repeatable pipeline for both capturing and deploying environments.
