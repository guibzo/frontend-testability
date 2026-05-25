# Template Selection

Use this reference to match the user's request to the smallest useful starter template.

## Project Matching

| Request signals | Suggested shape | Template |
| --- | --- | --- |
| blog, post, article, docs | content-heavy static site | `astro-static` |
| landing, marketing, portfolio | static marketing site | `nextjs-static` |
| e-commerce, product catalog, subscription | full-stack product with billing | `nextjs-saas` |
| dashboard, admin, CRM, internal tool | authenticated web app | `nextjs-fullstack` |
| api, backend, service, REST | Node API service | `express-api` |
| python, fastapi | Python API service | `python-fastapi` |
| mobile, iOS, Android, Expo | React Native app | `react-native-app` |
| flutter, dart | Flutter app | `flutter-app` |
| extension, browser plugin | browser extension | `chrome-extension` |
| electron, desktop | desktop app | `electron-desktop` |
| cli, terminal, command-line | CLI utility | `cli-tool` |
| monorepo, workspace, shared packages | monorepo | `monorepo-turborepo` |
| vue, nuxt full-stack app | Nuxt web app | `nuxt-app` |

## Selection Rules

1. Optimize for the user's first deliverable, not the maximum future scope.
2. Prefer the simplest template that can absorb the near-term roadmap.
3. Ask only the missing high-impact questions:
   - Who uses it?
   - Is authentication required?
   - Is there persistent data?
   - Does it need payments or content authoring?
4. If the product spans multiple surfaces, start with the core one and plan follow-on apps later.

## Escalation Triggers

- Use a monorepo only when multiple deployable apps or shared packages are real requirements.
- Use SaaS scaffolding only when billing, auth, or account management are first-class.
- Use full-stack web defaults before inventing a custom stack.
