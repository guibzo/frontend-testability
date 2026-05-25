---
name: debugging
description: Debug issues systematically by narrowing scope, validating hypotheses, and isolating the real root cause before fixing.
---

# Debugging

## Use This When

- A bug, regression, or failure mode needs diagnosis
- The cause is unclear or there are multiple plausible explanations
- You need a repeatable process instead of ad hoc guessing

## Core Workflow

1. Reproduce the issue reliably.
2. Reduce the failing surface to the smallest useful scope.
3. Gather evidence before choosing a theory.
4. Test one hypothesis at a time.
5. Fix the root cause, then verify adjacent risks.

## References

- `references/systematic-debugging-method.md`
- `references/debug-investigation-runbook.md`

## Migration Inputs

- Source skill: `.agent/skills/systematic-debugging/SKILL.md`
- Source workflow: `.agent/workflows/debug.md`
