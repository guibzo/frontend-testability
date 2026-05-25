# Validation Script Reference

The migrated source skill included helper scripts for unified lint execution and type coverage analysis.

## Typical Uses

- run a repository-wide validation pass after edits
- get one entry point for multiple checks
- inspect type coverage trends where that metric matters

## Script Intent

### Unified Lint Runner

Use a wrapper like `lint_runner.py` when you need one command that discovers and runs the appropriate checks for a project.

### Type Coverage Analysis

Use a helper like `type_coverage.py` when a codebase tracks typed surface area and wants to measure progress rather than just pass or fail.

## Porting Guidance

Treat these scripts as optional accelerators. The durable part of the skill is the validation loop: choose the checks that fit the stack and interpret the results into a concrete fix plan.
