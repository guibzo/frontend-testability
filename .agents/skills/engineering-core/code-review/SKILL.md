---
name: code-review
description: Review code for bugs, regressions, maintainability issues, and missing tests. Use when auditing changes or preparing feedback.
---

# Code Review

## Use This When

- Reviewing a patch, pull request, or refactor
- Auditing change risk before merge or release
- Looking for missing tests or behavior regressions

## Core Workflow

1. Check correctness first.
2. Look for regressions at boundaries, state transitions, and error paths.
3. Verify tests cover the changed behavior, not just happy paths.
4. Call out maintainability issues only after correctness and risk.
5. Keep findings concrete and line-of-code anchored where possible.

## References

- `references/review-checklist.md`

## Migration Inputs

- Source: `.agent/skills/code-review-checklist/SKILL.md`
