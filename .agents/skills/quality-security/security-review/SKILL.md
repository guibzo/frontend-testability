---
name: security-review
description: Review applications for vulnerabilities, misconfigurations, abuse cases, and offensive testing opportunities.
---

# Security Review

## Use This When

- Auditing application security posture
- Checking auth, authorization, input handling, or exposure risks
- Running a structured review before release or after major changes

## Core Workflow

1. Map the trust boundaries.
2. Review authn, authz, secrets, inputs, and output exposure.
3. Check abuse cases, escalation paths, and common web risks.
4. Separate confirmed issues from speculative attack ideas.
5. Escalate any high-impact or externally reachable risk clearly.

## References

- `references/security-review-playbook.md`
- `references/security-review-checklists.md`
- `references/offensive-security-companion.md`

## Migration Inputs

- Source skills: `.agent/skills/vulnerability-scanner`, `.agent/skills/red-team-tactics`
