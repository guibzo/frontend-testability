import { DatabaseSync } from 'node:sqlite'

import { betterAuth } from 'better-auth'
import { nextCookies } from 'better-auth/next-js'

import { env } from '@/lib/env'

const database = new DatabaseSync('auth.sqlite')

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  database,
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
  trustedOrigins: [env.APP_URL, 'http://localhost:3000', 'http://localhost:3100'],
})

