# Design Research Runbook

Use this runbook when design direction is still fuzzy and you need a portable way to turn a product brief into a coherent web UI system.

## What to Capture First

- Product type, audience, and industry
- Visual adjectives the team already agrees on
- Existing brand constraints, if any
- Delivery stack, with `html-tailwind` as a reasonable fallback when nothing else is specified

## Working Sequence

1. Translate the request into search terms that combine product type, industry, and style.
2. Start by generating a full design system proposal before debating individual components.
3. Supplement the design system only where more depth is needed: style exploration, typography options, landing-page structure, or UX guidance.
4. Convert the result into implementation tokens and page-level decisions rather than leaving it as inspiration.

## Design System Checklist

- Pattern and layout direction
- Color strategy and accent usage
- Typography pairing and hierarchy
- Motion/effects guidance
- Anti-patterns to avoid for this product category

## Targeted Follow-Up Research

Use focused follow-up passes when the first system is too generic:

- Style research for stronger visual direction
- Typography research for alternate pairings
- UX research for accessibility, loading, motion, or interaction questions
- Landing-page research for hero, social-proof, pricing, and CTA structure

## Implementation Handoff

Before building, make the system concrete:

- Pick container widths, spacing rhythm, and type scale
- Turn palette choices into semantic tokens
- Define interactive states, icon rules, and motion limits
- Note any stack-specific constraints that should shape the implementation
