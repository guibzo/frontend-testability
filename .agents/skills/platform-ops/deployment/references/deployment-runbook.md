# Deployment Runbook

Use this runbook to prepare, execute, verify, and if needed roll back a release.

## Decide The Deployment Shape

Match the process to the platform:

- static or JAMstack hosting
- managed application platforms
- self-managed VPS or VM environments
- containers or orchestrators
- serverless or edge platforms

The steps below stay portable even when the commands differ.

## Standard Release Flow

1. Define the environment and exact release scope.
2. Verify tests, build, configuration, secrets, and migrations.
3. Confirm monitoring and rollback readiness.
4. Deploy while watching logs, health, and platform output.
5. Verify health endpoints, key flows, and error rates.
6. Confirm success or trigger rollback.

## Pre-Deployment Checklist

- [ ] tests and linting are in an acceptable state for the target environment
- [ ] production build succeeds
- [ ] environment variables and secrets are verified
- [ ] schema or data migrations are reviewed
- [ ] rollback path is documented
- [ ] stakeholders know the timing if coordination is needed
- [ ] monitoring is open before rollout starts

## Post-Deployment Verification

Verify at least:

- health checks
- logs and error rate
- critical user journeys
- dependency connectivity
- performance guardrails

Treat the first few minutes as an active observation window, not the end of the job.

## Rollback Triggers

Roll back quickly when:

- the service is down
- critical errors appear immediately
- data integrity is at risk
- performance regresses sharply on key flows

Prefer stabilizing service first and debugging second.
