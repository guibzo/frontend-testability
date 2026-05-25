---
name: app-from-template
description: Scaffold new apps from stable templates and stack recipes without loading every template or implementation detail into context.
---

# App From Template

## Use This When

- Creating a brand-new app or service
- Matching a request to a starter template or default stack
- Producing a scaffold plan before implementation

## Core Workflow

1. Detect the product shape and platform.
2. Choose the smallest fitting starter template.
3. Load only the matching template or stack reference.
4. Keep scaffolding guidance separate from domain skills.

## References

- `references/template-selection.md` for project-type matching and starter choice
- `references/stack-selection.md` for default stack recommendations and alternatives
- `references/project-structure.md` for baseline folder layouts and structure principles
- `references/feature-scoping.md` for turning requested features into implementation slices
- `references/runbook-new-app.md` for portable new-project flow
- `references/runbook-enhancement.md` for portable enhancement flow
- `templates/*/TEMPLATE.md` for stack-specific starter layouts

## Migration Inputs

- Source hub: `.agent/skills/app-builder/SKILL.md`
- Source templates: `.agent/skills/app-builder/templates`
- Source supporting files: `project-detection.md`, `tech-stack.md`, `scaffolding.md`, `feature-building.md`, `agent-coordination.md`
