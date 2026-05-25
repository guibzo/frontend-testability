# Project Structure

Use folder structures as defaults, not dogma. The goal is clear ownership and low-friction change.

## Web App Baseline

```text
project-name/
├── src/
│   ├── app/                # routes and layouts
│   ├── features/           # feature-owned modules
│   ├── shared/             # reusable UI and utilities
│   └── server/             # server-only code
├── prisma/                 # schema and migrations when relevant
├── public/
├── .env.example
├── package.json
└── README.md
```

## Structure Principles

- Keep route files thin and move durable logic into feature modules.
- Separate server-only and client-safe code.
- Put shared code in one place only when it is genuinely shared.
- Name folders around business capability rather than technical layer when possible.

## File Placement Guide

| Need | Default location |
| --- | --- |
| new route or page | `src/app/` |
| feature-specific component | `src/features/<feature>/components/` |
| shared primitive or utility | `src/shared/` |
| data access and integrations | `src/server/` |
| environment examples | `.env.example` |

## When To Deviate

- Use package-based structure when building a real monorepo.
- Use framework-native defaults when a template strongly expects them.
- Prefer flatter structures for small utilities and CLI tools.
