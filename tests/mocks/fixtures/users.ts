import { type ExternalUser } from '@/http/users/types'

export const usersFixture: ExternalUser[] = [
  {
    id: 1,
    name: '  Ada Lovelace  ',
    email: 'ADA@analysis.dev',
    company: {
      name: 'Analytical Engines',
    },
  },
  {
    id: 2,
    name: 'Grace Hopper',
    email: 'grace@compiler.dev',
    company: {
      name: ' ',
    },
  },
  {
    id: 3,
    name: 'Linus Torvalds',
    email: 'linus@kernel.dev',
    company: {
      name: 'Kernel Labs',
    },
  },
]
