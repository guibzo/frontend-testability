export type InventoryProduct = {
  id: string
  name: string
  category: 'hardware' | 'software' | 'accessory'
  stock: number
  reserved: number
  priceInCents: number
}

export type InventoryQuery = {
  search: string
  page: number
  pageSize: number
  category: 'all' | InventoryProduct['category']
}

export type InventoryResponse = {
  items: InventoryProduct[]
  total: number
  page: number
  pageSize: number
  requestFingerprint: string
}

export type OrdersSummary = {
  pending: number
  approved: number
  canceled: number
}

