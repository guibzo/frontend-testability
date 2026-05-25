import { productsFixture } from '@tests/mocks/fixtures/products'
import { http,HttpResponse } from 'msw'

export const apiBaseUrl = 'http://localhost:3000'
export const dashboardProductsEndpoint = `${apiBaseUrl}/api/dashboard/products`

export const handlers = [
  http.get(dashboardProductsEndpoint, ({ request }) => {
    const url = new URL(request.url)
    const search = (url.searchParams.get('search') || '').toLowerCase()
    const category = url.searchParams.get('category') || 'all'
    const page = Number(url.searchParams.get('page') || '1')
    const pageSize = Number(url.searchParams.get('pageSize') || '4')
    const requestFingerprint = url.searchParams.get('requestFingerprint') || ''

    const filteredBySearch = productsFixture.filter(product => !search || product.name.toLowerCase().includes(search))
    const filteredByCategory = filteredBySearch.filter(product => category === 'all' || product.category === category)

    const start = (page - 1) * pageSize
    const items = filteredByCategory.slice(start, start + pageSize)

    return HttpResponse.json({
      items,
      total: filteredByCategory.length,
      page,
      pageSize,
      requestFingerprint,
    })
  }),
]
