# Orchestration Runbook

Use this runbook when a task is complex enough to require coordinated multi-owner work.

## Orchestration Flow

1. Analyze domains touched by the request.
2. Keep blocking or high-context work local until the task is decomposed.
3. Define independent slices with non-overlapping write scopes.
4. Delegate bounded work with explicit deliverables.
5. Reintegrate outputs into one coherent result.
6. Run final validation against the combined change.

## Planning Before Parallelism

Before delegating:

- identify shared constraints
- define file ownership clearly
- document dependencies between slices
- decide which checks must pass before merge or handoff

## Validation Expectations

The integrating owner should verify:

- delegated scopes did not overlap unexpectedly
- the combined result still follows the plan
- required validation or quality checks ran at the right boundary

## Synthesis Template

Capture:

- task summary
- owners or roles involved
- major findings or outputs from each slice
- unresolved risks or follow-up work
- final validation status

## Anti-Patterns

- delegating before the task is understood
- splitting work across the same files without a merge plan
- using parallelism to avoid making hard product or architecture decisions
- returning separate outputs without synthesis
