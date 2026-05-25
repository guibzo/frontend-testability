import { type User } from '@/http/users/types'

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

