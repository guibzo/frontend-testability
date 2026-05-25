# Skill Authoring

This pack follows a strict progressive-disclosure rule:

1. `name` and `description` decide whether a skill loads.
2. `SKILL.md` should stay short, procedural, and intent-specific.
3. Detailed material belongs in `references/`, scripts in `scripts/`, and templates in `assets/` or a dedicated scaffolding area.

Authoring standards:

- One skill equals one primary user intent.
- Prefer verbs and outcomes in descriptions: "Design APIs", "Audit frontend quality", "Plan project execution".
- Keep skill bodies structure-agnostic and portable across hosts.
- Remove legacy agent names unless the host truly supports that model.
- Avoid duplicate advice across sibling skills. Pick one owner and reference it from elsewhere.
- Long catalogs are not skills. They are indexes or reference files.
- If a file is mostly a checklist, keep it.
- If a file is mostly inspiration, examples, or deep theory, move it to `references/`.
- If a file is mostly step-by-step execution, keep it in the relevant skill or a runbook section.

Recommended `SKILL.md` outline:

```md
---
name: api-design
description: Design APIs, choose REST vs GraphQL vs RPC, and define auth, versioning, and response patterns.
---

# API Design

## Use this when

- User is designing or revising an API contract
- User needs help choosing API style or auth approach

## Do this

1. Clarify consumers and constraints.
2. Choose the smallest fitting API style.
3. Define resource or procedure shape.
4. Standardize responses and errors.
5. Lock versioning, auth, and rate limits.
6. Load only the needed reference files.

## References

- `references/style-selection.md` for REST vs GraphQL vs RPC
- `references/auth.md` for auth choices
- `references/versioning.md` for evolution strategy
```

Normalization rules for this corpus:

- Convert mixed frontmatter like `allowed-tools` into host-agnostic instructions unless the new host truly reads those keys.
- Rewrite slash workflows into plain "Use this when" guidance.
- Replace agent mentions with durable actions such as clarify, plan, verify, and document.
- Keep file names intent-first and human-readable.
- Use English consistently in the new pack, while preserving source material until migration is complete.
