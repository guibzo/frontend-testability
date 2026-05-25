# Rollout And Rollback Strategies

Use this reference to choose how to ship and how to recover safely.

## Rollout Options

### Rolling

- replace instances gradually
- good default for standard releases
- verify health during each step

### Blue-Green

- keep old and new environments side by side
- useful when fast cutover and easy rollback matter
- costs more infrastructure but simplifies recovery

### Canary

- send a small share of traffic to the new version first
- useful for risky changes that benefit from real traffic validation
- requires monitoring discipline and clear success criteria

## Rollback Principles

- rollback speed matters more than a perfect diagnosis
- avoid stacking multiple fixes during an incident
- communicate clearly about state, impact, and next steps
- run a follow-up review once the system is stable

## Platform-Agnostic Recovery Questions

1. What exact version are we returning to?
2. Can schema changes be reversed or safely tolerated?
3. What config or secret differences must be restored?
4. Which health checks confirm recovery?

## Failure Output Template

Capture:

- failed step
- observed errors
- current user impact
- immediate mitigation
- whether rollback is available and safe
