import { env } from '@/lib/env'

export const featureFlags = {
  inventoryTableV2: env.FEATURE_INVENTORY_TABLE_V2,
  orderSummary: env.FEATURE_ORDER_SUMMARY,
  experimentalFilters: env.FEATURE_EXPERIMENTAL_FILTERS,
}

