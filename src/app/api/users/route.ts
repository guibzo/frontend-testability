import { NextResponse } from 'next/server'

import { type ExternalUser } from '@/http/users/types'

const usersFixture: ExternalUser[] = [
  {
    id: 1,
    name: 'Ada Lovelace',
    email: 'ada@analysis.dev',
    company: {
      name: 'Analytical Engines',
    },
  },
  {
    id: 2,
    name: 'Grace Hopper',
    email: 'grace@compiler.dev',
    company: {
      name: 'Compilers Inc.',
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = (searchParams.get('q') || '').trim().toLowerCase()
  const shouldFail = searchParams.get('fail') === '1'

  if (shouldFail) {
    return NextResponse.json(
      {
        message: 'Intentional failure for testing.',
      },
      {
        status: 500,
      },
    )
  }

  if (!query) {
    return NextResponse.json({ users: usersFixture })
  }

  const users = usersFixture.filter(user => user.name.toLowerCase().includes(query))

  return NextResponse.json({ users })
}

