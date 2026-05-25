import { expect, test } from '@playwright/test'

const randomSuffix = () => Math.random().toString(36).slice(2, 8)

test.describe('Admin dashboard', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    page.on('console', message => {
      console.log(`[browser:${testInfo.title}] ${message.type()}: ${message.text()}`)
    })

    page.on('pageerror', error => {
      console.log(`[pageerror:${testInfo.title}] ${error.message}`)
    })

    page.on('requestfailed', request => {
      console.log(`[requestfailed:${testInfo.title}] ${request.url()} - ${request.failure()?.errorText || 'unknown'}`)
    })
  })

  const signUpAndGoToAdmin = async ({ page, email }: { page: import('@playwright/test').Page; email: string }) => {
    await page.goto('/auth/sign-in')
    await page.getByTestId('auth-tab-sign-up').click()
    await page.getByTestId('auth-sign-up-name').fill('Admin User')
    await page.getByTestId('auth-sign-up-email').fill(email)
    await page.getByTestId('auth-sign-up-cpf').fill('12345678901')
    await page.getByTestId('auth-sign-up-password').fill('password123')
    await page.getByTestId('auth-sign-up-submit').click()

    await expect(page).toHaveURL(/\/admin$/)
  }

  test('redirects guest users to sign-in', async ({ page }) => {
    await page.goto('/admin')
    await expect(page).toHaveURL(/\/auth\/sign-in$/)
    await expect(page.getByTestId('auth-panel')).toBeVisible()
  })

  test('supports sign-up, filtering and optimistic reserve', async ({ page }) => {
    const suffix = randomSuffix()
    const email = `admin-${suffix}@company.com`

    await signUpAndGoToAdmin({ page, email })
    await expect(page.getByTestId('admin-title')).toBeVisible()

    await page.getByTestId('inventory-search').fill('Monitor')
    await expect(page.getByTestId('inventory-row-p-1')).toBeVisible()

    const stockCell = page.getByTestId('inventory-stock-p-1')
    const initialStock = Number((await stockCell.textContent()) || '0')

    await page.getByTestId('inventory-reserve-p-1').click()
    await expect(page.getByTestId('inventory-stock-p-1')).not.toHaveText(String(initialStock))
  })

  test('signs out and returns to auth screen', async ({ page }) => {
    const suffix = randomSuffix()
    const email = `admin-signout-${suffix}@company.com`

    await signUpAndGoToAdmin({ page, email })
    await page.getByTestId('signout-button').click()

    await expect(page).toHaveURL(/\/auth\/sign-in$/)
    await expect(page.getByTestId('auth-panel')).toBeVisible()
  })
})
