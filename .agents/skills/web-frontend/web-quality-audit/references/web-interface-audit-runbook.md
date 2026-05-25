# Web Interface Audit Runbook

Use this runbook to review an existing web experience for accessibility, interaction quality, content clarity, and performance.

## Audit Flow

1. Inspect the current interface before suggesting redesigns.
2. Review the experience against the current Web Interface Guidelines source:
   `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`
3. Capture findings in a terse `file:line` style when reviewing code, or as page/component findings when reviewing a live product.
4. Separate factual findings from proposed fixes.

## What to Check

- Semantics, focus states, keyboard access, and ARIA usage
- Content hierarchy and scannability
- Feedback for loading, errors, and empty states
- Motion, transitions, and interaction affordances
- Performance issues that degrade perceived quality

## Output Structure

- Critical issues that block use or accessibility
- High-impact UX or content issues
- Lower-severity polish items
- Optional implementation ideas after the audit findings
