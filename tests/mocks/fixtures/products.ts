import { type InventoryProduct } from '@/http/dashboard/types'

export const productsFixture: InventoryProduct[] = [
  { id: 'p-1', name: '4K Monitor', category: 'hardware', stock: 9, reserved: 2, priceInCents: 189900 },
  { id: 'p-2', name: 'Mechanical Keyboard', category: 'accessory', stock: 12, reserved: 1, priceInCents: 49900 },
  { id: 'p-3', name: 'Enterprise VPN License', category: 'software', stock: 3, reserved: 0, priceInCents: 299900 },
  { id: 'p-4', name: 'USB-C Dock', category: 'hardware', stock: 0, reserved: 0, priceInCents: 75900 },
]

