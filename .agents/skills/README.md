# Skills Pack

This folder is a normalized, Cursor-oriented rewrite target for the markdown corpus in `.agent/`.

Design goals:

- Organize by primary user intent, not by legacy agent boundaries.
- Keep each `SKILL.md` short and information-first.
- Push long material into references or templates only when needed.
- Separate durable skills from scaffolding-heavy content.

Use these companion files first:

- `_index.yaml` for the pack inventory and trigger surface
- `meta/migration-map.md` for old-to-new mapping
- `meta/skill-authoring.md` for authoring conventions
- `meta/routing.md` for cross-skill loading suggestions

Current status:

- The new pack structure is scaffolded and named.
- The old Antigravity corpus remains in `.agent/` as the source of truth for migration.
- Each new skill includes concise scope, source inputs, and what should move into references next.
