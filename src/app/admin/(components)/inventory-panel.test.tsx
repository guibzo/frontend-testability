import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { InventoryPanel } from '@/app/admin/(components)/inventory-panel'
import { type InventoryResponse } from '@/http/dashboard/types'

const reserveProductActionMock = vi.fn()
const getDashboardProductsMock = vi.fn()

vi.mock('@/app/admin/actions', () => ({
  reserveProductAction: (...args: unknown[]) => reserveProductActionMock(...args),
}))

vi.mock('@/http/dashboard/get-dashboard-products', () => ({
  getDashboardProducts: (...args: unknown[]) => getDashboardProductsMock(...args),
}))

const initialData: InventoryResponse = {
  items: [{ id: 'p-1', name: '4K Monitor', category: 'hardware', stock: 9, reserved: 2, priceInCents: 189900 }],
  page: 1,
  pageSize: 4,
  total: 1,
  requestFingerprint: '',
}

describe('InventoryPanel', () => {
  beforeEach(() => {
    reserveProductActionMock.mockReset()
    getDashboardProductsMock.mockReset()
    getDashboardProductsMock.mockResolvedValue(initialData)
  })

  it('disables reserve button when user has no permission', () => {
    render(
      <InventoryPanel
        initialData={initialData}
        baseUrl='http://localhost:3000'
        permissions={{ canReserveStock: false, canManagePricing: false }}
        featureInventoryTableV2
      />,
    )

    expect(screen.getByTestId('inventory-reserve-p-1')).toBeDisabled()
  })

  it('shows optimistic stock update and syncs after mutation', async () => {
    const user = userEvent.setup()

    reserveProductActionMock.mockResolvedValue({
      ok: true,
    })
    getDashboardProductsMock.mockResolvedValue({
      ...initialData,
      items: [{ id: 'p-1', name: '4K Monitor', category: 'hardware', stock: 8, reserved: 3, priceInCents: 189900 }],
    })

    render(
      <InventoryPanel
        initialData={initialData}
        baseUrl='http://localhost:3000'
        permissions={{ canReserveStock: true, canManagePricing: true }}
        featureInventoryTableV2
      />,
    )

    await user.click(screen.getByTestId('inventory-reserve-p-1'))

    expect(screen.getByTestId('inventory-stock-p-1')).toHaveTextContent('8')

    await waitFor(() => {
      expect(reserveProductActionMock).toHaveBeenCalledWith({ productId: 'p-1' })
    })
  })
})
