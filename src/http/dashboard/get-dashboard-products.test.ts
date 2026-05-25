import { apiBaseUrl } from '@tests/mocks/handlers'
import { describe, expect, it } from 'vitest'

import { getDashboardProducts } from './get-dashboard-products'

describe('getDashboardProducts', () => {
  it('returns paginated products', async () => {
    const response = await getDashboardProducts({
      baseUrl: apiBaseUrl,
      query: {
        search: '',
        category: 'all',
        page: 1,
        pageSize: 2,
      },
      requestFingerprint: 'req-1',
    })

    expect(response.items).toHaveLength(2)
    expect(response.total).toBe(4)
    expect(response.requestFingerprint).toBe('req-1')
  })

  it('filters by search and category', async () => {
    const response = await getDashboardProducts({
      baseUrl: apiBaseUrl,
      query: {
        search: 'keyboard',
        category: 'accessory',
        page: 1,
        pageSize: 10,
      },
    })

    expect(response.items).toHaveLength(1)
    expect(response.items[0]?.name).toBe('Mechanical Keyboard')
  })
})

