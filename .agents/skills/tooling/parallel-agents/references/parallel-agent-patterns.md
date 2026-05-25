# Parallel Agent Patterns

Use this reference only when the host truly supports delegation.

## Good Fits

- Independent read-only analysis tasks
- Disjoint implementation slices with separate write ownership
- Verification running alongside implementation

## Poor Fits

- Blocking work that the main thread needs immediately
- Small tasks with one clear owner
- Overlapping edits to the same files

## Common Patterns

### Discovery Then Synthesis

1. One agent maps structure or requirements.
2. One or more agents inspect specific concerns.
3. The main thread integrates the findings.

### Split Implementation

1. Break work into disjoint modules or directories.
2. Assign one owner per slice.
3. Merge only after each slice is locally coherent.

### Implementation Plus Verification

1. The main thread or one worker implements.
2. Another worker checks tests, regressions, or security implications.
3. Integrate the findings before finalizing.

## Delegation Rules

- Keep ownership explicit.
- Do not duplicate work across agents.
- Prefer bounded prompts over open-ended “analyze everything.”
- Reintegrate into one coherent result instead of forwarding raw sub-agent outputs.
