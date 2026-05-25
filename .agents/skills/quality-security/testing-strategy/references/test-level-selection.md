# Test Level Selection

Choose the cheapest reliable test layer that gives confidence for the behavior you care about.

## Testing Pyramid

- Unit tests: many, fast, focused on business logic and edge cases
- Integration tests: some, focused on boundaries such as APIs, databases, and contracts
- End-to-end tests: few, focused on critical user flows and release confidence

## What To Cover At Each Level

### Unit

Best for:

- pure functions
- domain logic
- validation rules
- error handling branches

Avoid spending unit-test effort on framework internals, thin getters, or third-party behavior.

### Integration

Best for:

- API request and response behavior
- database queries and transactions
- service-to-service contracts
- auth and permission boundaries

### End-to-End

Best for:

- login and signup flows
- checkout or payment flows
- critical business actions
- high-risk user journeys that cross multiple layers

## Selection Rules

1. Start from risk: what failure would hurt most?
2. Pick the lowest layer that can verify that behavior honestly.
3. Use integration tests for boundaries, not every permutation.
4. Reserve e2e for flows that justify slower, more brittle coverage.

## Test Design Guidance

- Prefer behavior-focused names.
- Keep tests independent and deterministic.
- Use realistic but minimal data.
- Mock external systems at the edges, not the code under test.
