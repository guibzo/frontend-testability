# Web App End-to-End Guide

Use this reference when planning browser-level coverage for a web application.

## Discovery Before Test Authoring

Map the product surface first:

- routes and screens
- API endpoints that support critical flows
- auth gates and role-sensitive actions
- error states, empty states, and recovery paths

## What To Test End To End

Prioritize:

1. happy path user flows
2. authentication and session handling
3. critical business actions
4. high-value failure and recovery paths

## Stability Practices

- use stable selectors such as `data-testid` when needed
- keep test state clean and isolated
- wait on user-observable conditions, not arbitrary sleeps
- test user behavior rather than implementation details

## Browser Test Checklist

- [ ] target flow is important enough to justify e2e cost
- [ ] prerequisites and test data are explicit
- [ ] selectors are stable
- [ ] assertions check visible outcomes
- [ ] cleanup or reset path exists

## Suggested Tooling Notes

Browser suites often work well with Playwright plus fixtures, page objects only where they reduce duplication, and trace or screenshot capture for failure triage.
