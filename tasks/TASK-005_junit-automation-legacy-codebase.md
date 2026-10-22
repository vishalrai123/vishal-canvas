---
task_id: TASK-005
title: "Automated Unit Test Generation for a Legacy Monolithic Codebase"
category: "Quality Engineering / Test Automation"
tags: [junit, mockito, randoop, evosuite, amazon-q-developer, diffblue-cover, unit-testing, legacy-code]
role: "DevOps & Quality Automation Engineer"
one_line_summary: "Closed the gap between code and unit tests in a legacy monolith by automating JUnit generation for the majority of functional code, evaluating four generation tools and publishing developer guides."
---

# Automated Unit Test Generation for a Legacy Monolithic Codebase

## 1. Overview & Context

The organization's legacy monolithic codebase had grown far larger than its JUnit test suite. Writing tests by hand to close that gap was impractical, so I automated test generation on top of the JUnit and Mockito stack the codebase already used.

## 2. Problem Statement

- The difference between the size of the codebase and its JUnit coverage had become too large.
- Writing the missing tests by hand was not practical at that scale.

## 3. Objectives

- Automate JUnit generation for the majority of the functional codebase.
- Select tools through hands-on proof-of-concept rather than assumption.
- Leave developers with detailed guides so the approach is reusable.

## 4. Approach & Execution

1. **Baseline on JUnit and Mockito** — Used JUnit with Mockito as the foundation for generated tests, so they fit the existing framework.
2. **Tool proof-of-concept** — Evaluated Randoop and EvoSuite (automated test generators) and AI-assisted tools, Amazon Q Developer and Diffblue Cover, against the legacy code.
3. **Automated generation** — Applied the selected approach to generate JUnit tests for the majority of the functional codebase.
4. **Developer guides** — Wrote detailed, documented guides for each tool so developers can use them independently.

## 5. Tools & Technologies

`JUnit` · `Mockito` · `Randoop` · `EvoSuite` · `Amazon Q Developer` · `Diffblue Cover`

## 6. Challenges & Mitigations

| Challenge | Mitigation |
|---|---|
| Very large gap between code and tests | Automated generation instead of manual authoring |
| Uncertainty over which tool fits legacy code | Proof-of-concept across four tools |
| Enabling developers to use the tools | Detailed written guides for developers |

## 7. Outcomes & Impact

**What now exists or works that didn't before:**

- Automatically generated JUnit tests covering the majority of the functional codebase.
- Proof-of-concept findings on four generation tools.
- Developer guides for using each tool.

**Value delivered:**

- Large reduction in the code-to-test gap without manual test authoring.
- Documented tooling that developers can use independently.

## 8. Skills Demonstrated

- Test automation strategy for legacy systems
- Tool evaluation and proof-of-concept
- Mocking with Mockito
- Applying AI-assisted development tooling
- Technical documentation and enablement

## 9. Resume-Ready Highlights

- Automated JUnit generation for the majority of a legacy monolith's functional codebase using JUnit and Mockito, closing a large gap between code and tests.
- Evaluated Randoop, EvoSuite, Amazon Q Developer and Diffblue Cover through proof-of-concept to identify what works on legacy code.
- Authored detailed developer guides so teams can generate tests with these tools independently.

## 10. Full Task Summary

The legacy monolithic codebase had far more code than JUnit tests, and writing the missing tests by hand was not practical. Using the JUnit and Mockito framework already in place, I ran proofs-of-concept on Randoop, EvoSuite, Amazon Q Developer and Diffblue Cover and automated JUnit generation for the majority of the functional codebase. I documented each tool in detailed guides so developers can use them on their own.
