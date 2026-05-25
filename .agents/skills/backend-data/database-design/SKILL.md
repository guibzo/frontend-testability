---
name: database-design
description: Design schemas, indexes, migrations, and database selection with clear tradeoffs and operational awareness.
---

# Database Design

## Use This When

- Modeling application data
- Planning migrations or performance tuning
- Choosing between relational or alternative database approaches

## Core Workflow

1. Start with data shapes and access patterns.
2. Model the simplest schema that fits those patterns.
3. Design indexes from query needs, not guesswork.
4. Plan migrations for correctness and rollback safety.
5. Treat ORM choice as an implementation detail, not the schema itself.

## References

- `references/database-selection.md`
- `references/orm-selection.md`
- `references/schema-design.md`
- `references/indexing-strategy.md`
- `references/query-optimization.md`
- `references/migration-safety.md`

## Migration Inputs

- Source hub: `.agent/skills/database-design/SKILL.md`
- Source topic files: `schema-design.md`, `indexing.md`, `migrations.md`, `optimization.md`, `database-selection.md`, `orm-selection.md`
