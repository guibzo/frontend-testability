# Stack Selection

Default stacks should bias toward maintainability and fast setup, not novelty.

## Default Web Stack

| Layer | Default | Notes |
| --- | --- | --- |
| Frontend | Next.js App Router | Good default for product web apps |
| Language | TypeScript | Shared type safety across app and services |
| Styling | Tailwind CSS | Fast implementation when design intent is already clear |
| Validation | Zod | Useful on forms, APIs, and config boundaries |
| Database | PostgreSQL | Strong default for application data |
| ORM | Prisma or Drizzle | Pick based on team preference and query style |
| Auth | Auth.js or Clerk | Choose hosted vs self-managed tradeoff |
| Hosting | Vercel, Supabase, Neon | Good defaults for speed of setup |

## Alternatives By Need

| Need | Consider |
| --- | --- |
| static publishing | Astro |
| edge API or lightweight backend | Hono |
| real-time features | Supabase Realtime, Socket.IO |
| file storage | S3, Cloudinary |
| payments | Stripe, Paddle, LemonSqueezy |
| email | Resend, SendGrid |
| search | Typesense, Algolia |
| cross-platform mobile | Expo React Native or Flutter |

## Selection Rules

1. Choose the minimum stack that supports the first usable release.
2. Prefer common, well-documented tools over bespoke glue.
3. Avoid introducing a monorepo, event bus, or exotic infra before the product shape demands it.
4. Separate product decisions from implementation defaults so the stack can evolve later.
