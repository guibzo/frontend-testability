import { expect, test } from '@playwright/test'

const randomSuffix = () => Math.random().toString(36).slice(2, 8)

test.describe('Admin dashboard', () => {
  test('redirects guest users to sign-in', async ({ page }) => {
    await page.goto('/admin')
    await expect(page).toHaveURL(/\/auth\/sign-in$/)
    await expect(page.getByRole('heading', { name: 'Admin Access' })).toBeVisible()
  })

  test('supports sign-up, filtering and optimistic reserve', async ({ page }) => {
    const suffix = randomSuffix()
    const email = `admin-${suffix}@company.com`

    await page.goto('/auth/sign-in')
    await page.getByRole('button', { name: 'Sign up' }).click()
    await page.getByLabel('Name').fill('Admin User')
    await page.getByLabel('Email').fill(email)
    await page.getByLabel('CPF').fill('12345678901')
    await page.getByLabel('Password').fill('password123')
    await page.getByRole('button', { name: 'Create account' }).click()

    await expect(page).toHaveURL(/\/admin$/)
    await expect(page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible()

    await page.getByLabel('Search product').fill('Monitor')
    await expect(page.getByText('4K Monitor')).toBeVisible()

    const stockCell = page.locator('tr', { hasText: '4K Monitor' }).locator('td').nth(3)
    const initialStock = Number((await stockCell.textContent()) || '0')

    await page.locator('tr', { hasText: '4K Monitor' }).getByRole('button', { name: 'Reserve 1' }).click()
    await expect(page.locator('tr', { hasText: '4K Monitor' }).locator('td').nth(3)).not.toHaveText(String(initialStock))
  })
})

