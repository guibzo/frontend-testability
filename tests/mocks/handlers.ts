import { http,HttpResponse } from 'msw'

import { usersFixture } from './fixtures/users'

export const apiBaseUrl = 'http://localhost:3000'
export const usersEndpoint = `${apiBaseUrl}/api/testing-lab/users`

export const handlers = [
  http.get(usersEndpoint, ({ request }) => {
    const url = new URL(request.url)
    const query = (url.searchParams.get('q') || '').trim().toLowerCase()

    if (!query) {
      return HttpResponse.json({ users: usersFixture })
    }

    const users = usersFixture.filter(user => user.name.toLowerCase().includes(query))

    return HttpResponse.json({ users })
  }),
]

