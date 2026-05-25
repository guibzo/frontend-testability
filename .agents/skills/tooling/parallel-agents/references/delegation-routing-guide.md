# Delegation Routing Guide

Use this guide to decide whether work should stay local, be delegated to one specialist, or be split across parallel contributors.

## When Delegation Helps

Good candidates:

- multi-domain analysis
- bounded sidecar tasks with clear ownership
- reviews that benefit from different perspectives
- work that can proceed independently without overlapping writes

Poor candidates:

- tiny single-file fixes
- tasks with one obvious owner
- work blocked on shared context that has not been established yet

## Routing Heuristics

### Single Specialist

Use one owner when the task is narrow and the domain is clear, such as security review, testing strategy, backend implementation, or SEO work.

### Sequential Delegation

Use sequential delegation when later work depends on earlier findings, such as:

1. discover the codebase
2. review the affected area
3. validate the resulting change

### Parallel Delegation

Use parallel delegation only when scopes do not overlap and integration criteria are explicit up front.

## Complexity Checks

- simple: one domain, one owner, direct execution
- moderate: two related domains, likely sequential handoff
- complex: multiple domains or significant uncertainty, needs explicit orchestration

## Context Passing

Every delegated task should include:

- the original request
- relevant decisions already made
- current constraints and owned paths
- expected output and validation boundary
