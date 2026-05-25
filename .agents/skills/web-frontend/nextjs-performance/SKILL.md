---
name: nextjs-performance
description: Improve Next.js and React performance across waterfalls, rendering, rerenders, bundles, data fetching, and server behavior.
---

# Next.js Performance

## Use This When

- Optimizing a React or Next.js application
- Investigating bundle size, slow rendering, or network waterfalls
- Fixing rerender churn or server/client boundary issues

## Core Workflow

1. Measure first.
2. Identify whether the bottleneck is network, render, JavaScript, or bundle related.
3. Fix the highest-leverage bottleneck before chasing micro-optimizations.
4. Keep guidance split by performance dimension in references.
5. Preserve readability while improving speed.

## Migration Inputs

- Source hub: `.agent/skills/nextjs-react-expert/SKILL.md`
- Source topic files: `1-async-eliminating-waterfalls.md` through `8-advanced-advanced-patterns.md`
- Merge support: `.agent/skills/performance-profiling/SKILL.md`

## References

- `references/performance-profiling-runbook.md`
- `references/async-waterfall-elimination.md`
- `references/bundle-size-optimization.md`
- `references/server-side-performance-patterns.md`
- `references/client-data-fetching-patterns.md`
- `references/rerender-optimization.md`
- `references/rendering-performance-patterns.md`
- `references/javascript-hot-path-optimization.md`
- `references/advanced-react-performance-patterns.md`
