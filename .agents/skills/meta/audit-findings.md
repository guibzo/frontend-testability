# Audit Findings

These are the highest-value cleanup findings from the corpus audit.

## P1

- `.agent/ARCHITECTURE.md` is stale and should not drive migration. It references missing skills such as `prisma-expert`, `nestjs-expert`, `docker-expert`, and `typescript-expert`, and also points at a missing `scripts/README.md`.
- Planning instructions are contradictory across the corpus. Some files require root-level `./{task-slug}.md`, while others require `docs/PLAN-{slug}.md` or `docs/PLAN.md`.
- Several hubs contain broken references that will dead-end progressive disclosure:
  - `.agent/skills/api-patterns/SKILL.md` references missing `backend-development` and `security-hardening`
  - `.agent/skills/nextjs-react-expert/SKILL.md` references missing `typescript-expert`
  - `.agent/skills/app-builder/templates/nuxt-app/TEMPLATE.md` references missing `vue-expert`
  - `.agent/workflows/create.md` references missing `conversation-manager`
- Workflow files are tightly coupled to Antigravity-specific agent behavior and should be rewritten rather than copied.

## P2

- Frontmatter conventions are mixed: `allowed-tools`, `tools`, custom `metadata`, and description-only blocks all appear.
- Testing and performance content overlaps enough that owner skills should absorb sibling material as references instead of keeping duplicate top-level peers.
- `behavioral-modes`, `intelligent-routing`, and `parallel-agents` are better treated as policy or routing metadata than portable user-facing skills.

## P3

- `web-design-guidelines` expects live external fetches, which makes it non-self-contained.
- `.agent/skills/doc.md` is valuable but should be rewritten into neutral English for the new pack.
- Some documentation templates mention example local files that do not exist, which is noisy but non-blocking.

## Migration Rule

When the old catalog conflicts with the filesystem, trust the filesystem.
