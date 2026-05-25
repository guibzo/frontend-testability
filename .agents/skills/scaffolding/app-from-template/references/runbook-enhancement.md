# Runbook: Enhancement

Use this runbook when the project already exists and the user wants changes added safely.

## Flow

1. Inspect the existing stack, boundaries, and current product behavior.
2. Identify the files, modules, and dependencies likely to change.
3. Decide whether the change is small enough to implement directly or large enough to plan first.
4. Warn about stack conflicts or hidden migration cost before coding.
5. Implement in small slices and verify after each meaningful change.

## Good Checkpoints

- The requested change fits the existing stack
- Any new dependency is justified
- Data and auth implications are understood
- Verification is specific and user-visible

## Anti-Patterns

- Treating every enhancement like a greenfield scaffold
- Smuggling in stack rewrites under the guise of a feature request
- Requiring a session manager or custom runtime state to understand the project
