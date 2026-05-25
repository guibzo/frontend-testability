# Localization Readiness

Use this reference when preparing a product for multiple languages, locales, and writing systems.

## Core Principles

- separate user-facing copy from code
- avoid concatenating translated fragments
- expect text expansion and contraction across languages
- localize dates, numbers, currency, and plural forms
- plan for right-to-left support early when relevant

## Product Readiness Checklist

- [ ] user-facing strings come from translation keys or resources
- [ ] supported locales are defined intentionally
- [ ] fallback language behavior is clear
- [ ] date and number formatting use locale-aware APIs
- [ ] pluralization strategy is chosen for complex messages
- [ ] RTL layout is tested if any supported language requires it

## Translation Workflow Guidance

- keep copy keys stable and descriptive
- define ownership for translation updates and reviews
- document which strings are user-visible, legal, or transactional
- avoid shipping mixed-language interfaces due to missing fallback rules

## Common Failure Modes

- hardcoded strings inside components
- string concatenation that breaks grammar
- fixed-width layouts that truncate translations
- locale formatting handled manually instead of through internationalization APIs
