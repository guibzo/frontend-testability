---
name: clean-code
description: Keep code readable, cohesive, low-risk, and easier to change. Use for refactoring, naming, structure, and maintainability decisions.
---

# Clean Code

## Use This When

- Refactoring or simplifying existing code
- Choosing names, boundaries, or abstractions
- Reducing complexity without changing behavior

## Core Workflow

1. Identify the highest-friction code path.
2. Preserve behavior before structure.
3. Prefer smaller, explicit units over clever indirection.
4. Improve names before adding abstractions.
5. Remove duplication only when the duplication is truly the same job.
6. Leave the code easier to test and review than before.

## References

- `references/pragmatic-coding-standards.md`

## Migration Inputs

- Source: `.agent/skills/clean-code/SKILL.md`
- Keep this skill lean. If examples grow, move them into `references/`.
