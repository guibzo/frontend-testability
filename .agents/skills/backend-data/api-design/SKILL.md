---
name: api-design
description: Design APIs, choose the right API style, and define auth, versioning, rate limiting, and response contracts.
---

# API Design

## Use This When

- Designing a new API or evolving an existing one
- Choosing between REST, GraphQL, or RPC-style interfaces
- Standardizing response envelopes, auth, and documentation

## Core Workflow

1. Clarify who consumes the API and how.
2. Choose the simplest API style that fits the constraints.
3. Define consistent resources or procedures.
4. Lock down auth, error shape, pagination, and rate limits.
5. Document the contract and its versioning path.

## References

- `references/api-style-selection.md`
- `references/rest-resource-design.md`
- `references/response-and-pagination-patterns.md`
- `references/graphql-schema-guidelines.md`
- `references/trpc-fit-and-tradeoffs.md`
- `references/versioning-strategies.md`
- `references/authentication-patterns.md`
- `references/rate-limiting.md`
- `references/api-documentation.md`
- `references/api-security-testing.md`

## Migration Inputs

- Source hub: `.agent/skills/api-patterns/SKILL.md`
- Source topic files: `api-style.md`, `rest.md`, `response.md`, `graphql.md`, `trpc.md`, `versioning.md`, `auth.md`, `rate-limiting.md`, `documentation.md`, `security-testing.md`
