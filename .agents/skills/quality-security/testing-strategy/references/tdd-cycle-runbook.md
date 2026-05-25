# TDD Cycle Runbook

Use TDD when it helps clarify behavior, reduce risk, or lock in a bug fix before implementation.

## The Cycle

1. Red: write a failing test for one behavior.
2. Green: write the minimum code required to pass it.
3. Refactor: improve structure while keeping tests green.

Repeat in small slices.

## Three Working Rules

1. Write production code only to satisfy a failing test.
2. Write only enough test to demonstrate the missing behavior.
3. Write only enough implementation to make that test pass.

## When TDD Helps Most

- new business logic
- bug fixes
- tricky branching behavior
- code where regression cost is high

TDD is usually less helpful for pure exploration, throwaway spikes, or heavily visual layout work.

## Phase Guidance

### Red

- name the expected behavior clearly
- start with the simplest happy path or bug reproduction
- verify the test fails for the expected reason

### Green

- do the simplest thing that could work
- avoid premature optimization
- resist designing the final abstraction too early

### Refactor

- remove duplication
- improve names and structure
- keep changes small enough that failures stay attributable

## Prioritization

Add tests in this order:

1. happy path
2. error cases
3. edge cases
4. performance or non-functional assertions where needed
