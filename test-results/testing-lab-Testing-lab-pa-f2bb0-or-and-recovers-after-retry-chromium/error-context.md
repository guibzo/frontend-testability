# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: testing-lab.spec.ts >> Testing lab page >> shows error and recovers after retry
- Location: e2e\testing-lab.spec.ts:29:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3100/testing-lab
Call log:
  - navigating to "http://localhost:3100/testing-lab", waiting until "load"

```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test'
  2  | 
  3  | test.describe('Testing lab page', () => {
  4  |   test('loads users and filters by name', async ({ page }) => {
  5  |     await page.route('**/api/users**', route => {
  6  |       return route.fulfill({
  7  |         status: 200,
  8  |         contentType: 'application/json',
  9  |         body: JSON.stringify({
  10 |           users: [
  11 |             { id: 1, name: 'Ada Lovelace', email: 'ada@analysis.dev', company: { name: 'Analytical Engines' } },
  12 |             { id: 2, name: 'Grace Hopper', email: 'grace@compiler.dev', company: { name: 'Compilers Inc.' } },
  13 |           ],
  14 |         }),
  15 |       })
  16 |     })
  17 | 
  18 |     await page.goto('/testing-lab')
  19 | 
  20 |     await expect(page.getByText('Ada Lovelace')).toBeVisible()
  21 |     await expect(page.getByText('Grace Hopper')).toBeVisible()
  22 | 
  23 |     await page.getByLabel('Search user by name').fill('ada')
  24 | 
  25 |     await expect(page.getByText('Ada Lovelace')).toBeVisible()
  26 |     await expect(page.getByText('Grace Hopper')).toHaveCount(0)
  27 |   })
  28 | 
  29 |   test('shows error and recovers after retry', async ({ page }) => {
  30 |     let shouldFail = true
  31 | 
  32 |     await page.route('**/api/users**', route => {
  33 |       if (shouldFail) {
  34 |         shouldFail = false
  35 |         return route.fulfill({
  36 |           status: 500,
  37 |           contentType: 'application/json',
  38 |           body: JSON.stringify({ message: 'erro' }),
  39 |         })
  40 |       }
  41 | 
  42 |       return route.fulfill({
  43 |         status: 200,
  44 |         contentType: 'application/json',
  45 |         body: JSON.stringify({
  46 |           users: [{ id: 3, name: 'Linus Torvalds', email: 'linus@kernel.dev', company: { name: 'Kernel Labs' } }],
  47 |         }),
  48 |       })
  49 |     })
  50 | 
> 51 |     await page.goto('/testing-lab')
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3100/testing-lab
  52 | 
  53 |     await expect(page.getByText('Unable to load users.')).toBeVisible()
  54 |     await page.getByRole('button', { name: 'Try again' }).click()
  55 |     await expect(page.getByText('Linus Torvalds')).toBeVisible()
  56 |   })
  57 | })
  58 | 
```