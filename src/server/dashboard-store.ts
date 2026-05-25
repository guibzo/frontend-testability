import { type InventoryProduct, type OrdersSummary } from '@/http/dashboard/types'

const productsStore: InventoryProduct[] = [
  { id: 'p-1', name: '4K Monitor', category: 'hardware', stock: 9, reserved: 2, priceInCents: 189900 },
  { id: 'p-2', name: 'Mechanical Keyboard', category: 'accessory', stock: 12, reserved: 1, priceInCents: 49900 },
  { id: 'p-3', name: 'Enterprise VPN License', category: 'software', stock: 3, reserved: 0, priceInCents: 299900 },
  { id: 'p-4', name: 'USB-C Dock', category: 'hardware', stock: 0, reserved: 0, priceInCents: 75900 },
  { id: 'p-5', name: 'Noise Canceling Headset', category: 'accessory', stock: 6, reserved: 1, priceInCents: 129900 },
  { id: 'p-6', name: 'Project Management Suite', category: 'software', stock: 7, reserved: 3, priceInCents: 159900 },
  { id: 'p-7', name: 'Laptop Stand', category: 'accessory', stock: 11, reserved: 0, priceInCents: 25900 },
  { id: 'p-8', name: 'Onboarding Automation', category: 'software', stock: 2, reserved: 1, priceInCents: 99000 },
]

const wait = (milliseconds: number) =>
  new Promise(resolve => {
    setTimeout(resolve, milliseconds)
  })

export const listProducts = async ({
  search,
  category,
  page,
  pageSize,
  latencyMs,
}: {
  search: string
  category: 'all' | InventoryProduct['category']
  page: number
  pageSize: number
  latencyMs: number
}) => {
  await wait(latencyMs)

  const normalizedSearch = search.trim().toLowerCase()
  const shouldFilterByCategory = category !== 'all'

  const filteredProducts = productsStore.filter(product => {
    const matchesSearch = !normalizedSearch || product.name.toLowerCase().includes(normalizedSearch)
    const matchesCategory = !shouldFilterByCategory || product.category === category
    return matchesSearch && matchesCategory
  })

  const total = filteredProducts.length
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const items = filteredProducts.slice(start, end)

  return {
    items,
    total,
    page,
    pageSize,
  }
}

export const reserveOneUnit = async ({ productId }: { productId: string }) => {
  await wait(700)

  const product = productsStore.find(item => item.id === productId)
  if (!product) {
    return {
      ok: false,
      message: 'Product not found.',
    }
  }

  if (product.stock <= 0) {
    return {
      ok: false,
      message: 'Product is out of stock.',
    }
  }

  product.stock -= 1
  product.reserved += 1

  return {
    ok: true,
    product,
  }
}

export const getOrdersSummary = async ({ latencyMs }: { latencyMs: number }): Promise<OrdersSummary> => {
  await wait(latencyMs)

  return {
    pending: 17,
    approved: 142,
    canceled: 9,
  }
}

