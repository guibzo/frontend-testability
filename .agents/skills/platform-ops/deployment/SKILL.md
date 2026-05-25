---
name: deployment
description: Prepare, verify, and execute application deployments with portable runbooks, checks, and rollback awareness.
---

# Deployment

## Use This When

- Shipping changes to staging or production
- Building a deployment checklist or runbook
- Reviewing release risk and rollback readiness

## Core Workflow

1. Define the target environment and release scope.
2. Verify build, config, migrations, and dependencies.
3. Plan rollout, monitoring, and rollback.
4. Record follow-up checks after deploy.

## References

- `references/deployment-principles.md`
- `references/deployment-runbook.md`
- `references/rollout-and-rollback-strategies.md`

## Migration Inputs

- Source skill: `.agent/skills/deployment-procedures/SKILL.md`
- Source workflow: `.agent/workflows/deploy.md`
