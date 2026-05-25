import { type ExternalUser, type User } from '@/http/users/types'

const FALLBACK_COMPANY_NAME = 'Independent'

const normalizeCompanyName = (company?: { name?: string } | null) => {
  const companyName = company?.name?.trim()
  return companyName || FALLBACK_COMPANY_NAME
}

export const normalizeUser = (user: ExternalUser): User => {
  return {
    id: user.id,
    name: user.name.trim(),
    email: user.email.trim().toLowerCase(),
    company: normalizeCompanyName(user.company),
  }
}

export const normalizeUsers = (users: ExternalUser[]) => users.map(normalizeUser)

