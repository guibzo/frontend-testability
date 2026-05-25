---
name: testing-strategy
description: Choose effective unit, integration, end-to-end, and TDD strategies without overtesting or relying on brittle suites.
---

# Testing Strategy

## Use This When

- Deciding what to test and at what level
- Improving an existing test pyramid or flaky suite
- Translating implementation work into a focused testing plan

## Core Workflow

1. Identify the highest-risk behaviors.
2. Cover them at the cheapest reliable layer.
3. Use integration and e2e tests for boundary confidence, not everything.
4. Apply TDD when it clarifies behavior or reduces risk.
5. Keep test guidance split by level in references.

## References

- `references/test-level-selection.md`
- `references/tdd-cycle-runbook.md`
- `references/web-app-e2e-guide.md`

## Migration Inputs

- Source skills: `.agent/skills/testing-patterns`, `.agent/skills/tdd-workflow`, `.agent/skills/webapp-testing`
