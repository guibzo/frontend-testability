# Feature Scoping

Turn feature requests into concrete slices before writing code.

## Analysis Frame

For each requested feature, check:

- Data changes: new models, tables, fields, or migrations
- Backend changes: new endpoints, actions, webhooks, jobs, or auth rules
- Frontend changes: new pages, components, flows, and copy
- Configuration changes: env vars, third-party services, secrets
- Dependencies: new libraries, vendor setup, background tasks

## Example

Request: `add payment system`

- Data: orders, payment state, customer identifiers
- Backend: checkout initiation, webhook handling, access rules
- Frontend: checkout UI, success state, billing settings
- Config: provider keys, webhook secrets

## Delivery Rules

1. Break the feature into user-visible outcomes, not file lists.
2. Surface the risky dependencies early.
3. For larger changes, stage the work:
   - foundation
   - core flow
   - edge cases and polish
4. Always include verification for the happy path and the most likely failure path.
