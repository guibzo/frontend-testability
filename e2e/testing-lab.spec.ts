import { expect, test } from '@playwright/test'

test.describe('Testing lab page', () => {
  test('carrega usuários e filtra por nome', async ({ page }) => {
    await page.route('**/api/testing-lab/users**', route => {
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

    await page.getByLabel('Buscar usuário por nome').fill('ada')

    await expect(page.getByText('Ada Lovelace')).toBeVisible()
    await expect(page.getByText('Grace Hopper')).toHaveCount(0)
  })

  test('mostra erro e recupera com retry', async ({ page }) => {
    let shouldFail = true

    await page.route('**/api/testing-lab/users**', route => {
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

    await expect(page.getByText('Não foi possível carregar os usuários.')).toBeVisible()
    await page.getByRole('button', { name: 'Tentar novamente' }).click()
    await expect(page.getByText('Linus Torvalds')).toBeVisible()
  })
})
