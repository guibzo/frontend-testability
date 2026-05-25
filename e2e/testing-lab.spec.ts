import { expect, test } from '@playwright/test'

test.describe('Testing lab page', () => {
  test('loads users and filters by name', async ({ page }) => {
    await page.route('**/api/users**', route => {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          users: [
            { id: 1, name: 'Ada Lovelace', email: 'ada@analysis.dev', company: { name: 'Analytical Engines' } },
            { id: 2, name: 'Grace Hopper', email: 'grace@compiler.dev', company: { name: 'Compilers Inc.' } },
          ],
        }),
      })
    })

    await page.goto('/testing-lab')

    await expect(page.getByText('Ada Lovelace')).toBeVisible()
    await expect(page.getByText('Grace Hopper')).toBeVisible()

    await page.getByLabel('Search user by name').fill('ada')

    await expect(page.getByText('Ada Lovelace')).toBeVisible()
    await expect(page.getByText('Grace Hopper')).toHaveCount(0)
  })

  test('shows error and recovers after retry', async ({ page }) => {
    let shouldFail = true

    await page.route('**/api/users**', route => {
      if (shouldFail) {
        shouldFail = false
        return route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'erro' }),
        })
      }

      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          users: [{ id: 3, name: 'Linus Torvalds', email: 'linus@kernel.dev', company: { name: 'Kernel Labs' } }],
        }),
      })
    })

    await page.goto('/testing-lab')

    await expect(page.getByText('Unable to load users.')).toBeVisible()
    await page.getByRole('button', { name: 'Try again' }).click()
    await expect(page.getByText('Linus Torvalds')).toBeVisible()
  })
})
