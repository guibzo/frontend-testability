# Validation Loop

Use this loop after code changes to turn project checks into actionable follow-up work.

## Core Loop

1. Run the relevant lint, type, test, and validation commands.
2. Group failures by root cause rather than fixing them one line at a time.
3. Fix the highest-signal failures first.
4. Re-run the checks that exercise the changed behavior.
5. Do not report the work complete while critical checks are still failing without calling that out explicitly.

## Common Check Types

### JavaScript And TypeScript

- linting
- type-checking
- tests
- dependency audit when appropriate for the task

### Python

- linting and formatting
- static typing where configured
- security or quality analyzers where relevant
- tests

## When Tooling Is Missing

If a project lacks obvious validation commands, inspect config files and package scripts first. Suggest a minimal validation path instead of pretending no checks are needed.

## Interpreting Results

- lint failures usually point to syntax, style, or unsafe patterns
- type failures usually indicate contract mismatches
- validation-script failures often reveal domain-specific breakage that generic linters miss
