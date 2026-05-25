import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http,HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'

import { usersEndpoint } from '../../../../tests/mocks/handlers'
import { server } from '../../../../tests/mocks/server'
import { UsersLab } from './users-lab'

describe('UsersLab', () => {
  it('renderiza lista após carregamento', async () => {
    render(<UsersLab />)

    const list = await screen.findByRole('list', {
      name: 'Lista de usuários',
    })

    const items = within(list).getAllByRole('listitem')

    expect(items).toHaveLength(3)
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument()
  })

  it('filtra usuários por nome', async () => {
    const user = userEvent.setup()

    render(<UsersLab />)

    await screen.findByText('Grace Hopper')
    await user.type(screen.getByLabelText('Buscar usuário por nome'), 'grace')

    expect(screen.getByText('Grace Hopper')).toBeInTheDocument()
    expect(screen.queryByText('Ada Lovelace')).not.toBeInTheDocument()
  })

  it('permite retry quando request falha', async () => {
    let shouldFail = true

    server.use(
      http.get(usersEndpoint, () => {
        if (shouldFail) {
          return HttpResponse.json({ message: 'erro' }, { status: 500 })
        }

        return HttpResponse.json({
          users: [{ id: 20, name: 'Barbara Liskov', email: 'barbara@mit.dev', company: { name: 'MIT' } }],
        })
      }),
    )

    const user = userEvent.setup()

    render(<UsersLab />)

    await screen.findByRole('alert')

    shouldFail = false
    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }))

    expect(await screen.findByText('Barbara Liskov')).toBeInTheDocument()
  })
})
