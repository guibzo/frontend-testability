# Runbook: New App

Use this runbook when a request is primarily about starting a new application.

## Flow

1. Clarify the product type, audience, and first release scope.
2. Match the request to a starter template.
3. Choose the default stack and only override where requirements demand it.
4. Sketch the initial project structure and the first milestone.
5. Build the scaffold and the thinnest end-to-end slice that proves the setup.
6. Verify local startup, basic navigation or endpoint health, and required configuration.

## Questions Worth Asking

- Is this mostly content, CRUD, workflow, or real-time?
- Does it need auth, billing, or multi-user data from day one?
- Is mobile, browser, desktop, or CLI the main surface?

## Anti-Patterns

- Starting with a monorepo before there are multiple bounded apps
- Choosing a template because it is trendy rather than because it fits
- Loading every template into context instead of reading one relevant template
