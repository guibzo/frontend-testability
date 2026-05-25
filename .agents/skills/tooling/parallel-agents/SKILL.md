---
name: parallel-agents
description: Coordinate parallel agent work when the host supports delegation, with clear ownership, integration, and validation boundaries.
---

# Parallel Agents

## Use This When

- The host supports multiple agents or delegated runs
- Work can be split into independent, non-overlapping slices
- You need routing guidance for parallel execution

## Core Workflow

1. Keep blocking work local.
2. Delegate bounded sidecar tasks with explicit ownership.
3. Avoid overlapping write scopes.
4. Reintegrate findings into one coherent result.

## References

- `references/parallel-agent-patterns.md`
- `references/routing-matrix.md`
- `references/delegation-routing-guide.md`
- `references/orchestration-runbook.md`

## Migration Inputs

- Source skills: `.agent/skills/parallel-agents`, `.agent/skills/intelligent-routing`
- Source artifacts: `.agent/agents/*`, `.agent/workflows/orchestrate.md`
