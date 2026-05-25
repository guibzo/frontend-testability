export type ExternalUserDTO = {
  id: number
  name: string
  email: string
  company?: {
    name?: string
  } | null
}

export type User = {
  id: number
  name: string
  email: string
  company: string
}

const FALLBACK_COMPANY_NAME = 'Independent'

const normalizeCompanyName = (company?: { name?: string } | null) => {
  const companyName = company?.name?.trim()
  return companyName || FALLBACK_COMPANY_NAME
}

export const normalizeUser = (user: ExternalUserDTO): User => {
  return {
    id: user.id,
    name: user.name.trim(),
    email: user.email.trim().toLowerCase(),
    company: normalizeCompanyName(user.company),
  }
}

export const normalizeUsers = (users: ExternalUserDTO[]) => users.map(normalizeUser)

export const filterUsersByName = ({
  users,
  query,
}: {
  users: User[]
  query: string
}) => {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) return users

  return users.filter(({ name }) => name.toLowerCase().includes(normalizedQuery))
}

