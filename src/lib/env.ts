import 'dotenv/config'

import { z } from 'zod'

const parseBoolean = (value: string | undefined, fallback: boolean) => {
  const normalizedValue = (value || '').trim().toLowerCase()
  const dictionary: Record<string, boolean> = {
    '1': true,
    true: true,
    yes: true,
    on: true,
    '0': false,
    false: false,
    no: false,
    off: false,
  }

  return normalizedValue in dictionary ? dictionary[normalizedValue] : fallback
}

const envSchema = z
  .object({
    SERVER_URL: z.string().default('http://localhost:3333'),
    APP_URL: z.string().default('http://localhost:3000'),
    API_BASE_URL: z.string().optional(),
    BETTER_AUTH_URL: z.string().optional(),
    BETTER_AUTH_SECRET: z.string().default('development-secret-change-me'),
    FEATURE_INVENTORY_TABLE_V2: z.string().optional(),
    FEATURE_ORDER_SUMMARY: z.string().optional(),
    FEATURE_EXPERIMENTAL_FILTERS: z.string().optional(),
  })
  .transform(rawEnv => {
    return {
      SERVER_URL: rawEnv.SERVER_URL,
      APP_URL: rawEnv.APP_URL,
      API_BASE_URL: rawEnv.API_BASE_URL || `${rawEnv.APP_URL}/api`,
      BETTER_AUTH_URL: rawEnv.BETTER_AUTH_URL || rawEnv.APP_URL,
      BETTER_AUTH_SECRET: rawEnv.BETTER_AUTH_SECRET,
      FEATURE_INVENTORY_TABLE_V2: parseBoolean(rawEnv.FEATURE_INVENTORY_TABLE_V2, true),
      FEATURE_ORDER_SUMMARY: parseBoolean(rawEnv.FEATURE_ORDER_SUMMARY, true),
      FEATURE_EXPERIMENTAL_FILTERS: parseBoolean(rawEnv.FEATURE_EXPERIMENTAL_FILTERS, true),
    }
  })

const parsedEnv = envSchema.safeParse(process.env)

if (parsedEnv.success === false) {
  console.error('Invalid environment variables at web:', parsedEnv.error.format())

  throw new Error('Invalid environment variables at web.')
}

export const env = parsedEnv.data
