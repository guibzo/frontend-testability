# Migration Map

This is the working map from the old Antigravity layout to the new skill pack.

## Keep And Re-home

| Source | Destination | Action |
| --- | --- | --- |
| `.agent/skills/architecture/*` | `engineering-core/architecture` | Keep. Split deep pattern material into `references/`. |
| `.agent/skills/clean-code/SKILL.md` | `engineering-core/clean-code` | Keep as a concise baseline skill. |
| `.agent/skills/systematic-debugging/SKILL.md` | `engineering-core/debugging` | Keep as a first-class debugging skill. |
| `.agent/skills/code-review-checklist/SKILL.md` | `engineering-core/code-review` | Keep and expand toward review findings, regressions, and tests. |
| `.agent/skills/frontend-design/*` | `web-frontend/design-system-ui` | Keep. Move psychology, color, type, motion into references. |
| `.agent/skills/tailwind-patterns/SKILL.md` | `web-frontend/design-system-ui` | Merge as implementation support, not a standalone domain skill. |
| `.agent/skills/nextjs-react-expert/*` | `web-frontend/nextjs-performance` | Keep. Rename to match actual job-to-be-done. |
| `.agent/skills/performance-profiling/SKILL.md` | `web-frontend/nextjs-performance` or `web-quality-audit` | Merge to avoid split ownership of performance. |
| `.agent/skills/web-design-guidelines/SKILL.md` | `web-frontend/web-quality-audit` | Keep as audit-oriented skill. |
| `.agent/skills/api-patterns/*` | `backend-data/api-design` | Keep. Promote file-level references as needed. |
| `.agent/skills/database-design/*` | `backend-data/database-design` | Keep. Move detailed topics into references. |
| `.agent/skills/nodejs-best-practices/SKILL.md` | `backend-data/nodejs` | Keep. |
| `.agent/skills/python-patterns/SKILL.md` | `backend-data/python` | Keep. |
| `.agent/skills/testing-patterns/SKILL.md` | `quality-security/testing-strategy` | Merge. |
| `.agent/skills/tdd-workflow/SKILL.md` | `quality-security/testing-strategy` | Merge as runbook content. |
| `.agent/skills/webapp-testing/SKILL.md` | `quality-security/testing-strategy` | Merge as e2e-specific reference or script docs. |
| `.agent/skills/vulnerability-scanner/*` | `quality-security/security-review` | Merge. |
| `.agent/skills/red-team-tactics/SKILL.md` | `quality-security/security-review` | Merge as offensive perspective or reference. |
| `.agent/skills/bash-linux/SKILL.md` | `platform-ops/bash-linux` | Keep. |
| `.agent/skills/powershell-windows/SKILL.md` | `platform-ops/powershell-windows` | Keep. |
| `.agent/skills/deployment-procedures/SKILL.md` | `platform-ops/deployment` | Keep. |
| `.agent/workflows/deploy.md` | `platform-ops/deployment` | Rewrite into portable runbook steps. |
| `.agent/workflows/debug.md` | `engineering-core/debugging` | Rewrite into portable debugging runbook steps. |
| `.agent/skills/server-management/SKILL.md` | `platform-ops/server-ops` | Keep. |
| `.agent/skills/brainstorming/*` | `product-docs/discovery-brainstorm` | Keep. |
| `.agent/skills/plan-writing/SKILL.md` | `product-docs/planning` | Keep. |
| `.agent/workflows/plan.md` | `product-docs/planning` | Rewrite to remove hard agent dependency. |
| `.agent/skills/documentation-templates/SKILL.md` | `product-docs/documentation` | Keep. |
| `.agent/skills/seo-fundamentals/SKILL.md` | `growth-geo/seo` | Keep. |
| `.agent/skills/geo-fundamentals/SKILL.md` | `growth-geo/geo` | Keep. |
| `.agent/skills/i18n-localization/SKILL.md` | `growth-geo/i18n` | Keep. |
| `.agent/skills/mobile-design/*` | `specialized-mobile/mobile-ux` | Keep. Split platform-specific notes into references. |
| `.agent/skills/game-development/**` | `specialized-games/game-dev` | Keep. Route subdomains through references by platform and specialty. |
| `.agent/skills/mcp-builder/SKILL.md` | `tooling/mcp-builder` | Keep. |
| `.agent/skills/lint-and-validate/*` | `tooling/lint-validate` | Keep. |
| `.agent/skills/app-builder/*` | `scaffolding/app-from-template` | Keep but isolate as heavy scaffolding content. |

## Rewrite Or Fold Down

| Source | Destination | Action |
| --- | --- | --- |
| `.agent/workflows/*.md` | Closest owning skill | Rewrite from slash-command style into portable runbooks. |
| `.agent/agents/*.md` | `meta/routing.md` | Collapse into routing guidance unless your host still supports separate agent personas. |
| `.agent/skills/intelligent-routing/SKILL.md` | `tooling/parallel-agents` or delete | Fold into delegation guidance. |
| `.agent/skills/behavioral-modes/SKILL.md` | global rules or delete | Not a domain skill; keep only if your host supports mode switching. |
| `.agent/ARCHITECTURE.md` | `_index.yaml` | Replace as the canonical inventory. |
| `.agent/skills/doc.md` | `meta/skill-authoring.md` | Merge and translate. |

## Likely Drop Candidates

These are not necessarily bad content, but they are weak as standalone skills:

- stale catalog claims in `.agent/ARCHITECTURE.md`
- workflow files that only instruct the model to use a named agent
- routing or behavior docs that duplicate host-native features

## Migration Order

1. Port owner skills with the clearest scope first.
2. Move long topic files into `references/`.
3. Rewrite workflows into portable runbooks.
4. Replace the old catalog with `_index.yaml`.
5. Delete or archive stale routing and agent-only artifacts.
