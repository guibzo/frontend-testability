import type { ExternalUserDTO } from '@/features/testing-lab/domain/users'

export const usersFixture: ExternalUserDTO[] = [
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

