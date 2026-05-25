import { describe, expect, it } from 'vitest'

import { signInSchema, signUpSchema } from './schemas'

describe('auth form schema', () => {
  it('rejects invalid email in sign in', () => {
    const result = signInSchema.safeParse({
      email: 'invalid-email',
      password: 'password123',
    })

    expect(result.success).toBe(false)
  })

  it('rejects invalid cpf in sign up', () => {
    const result = signUpSchema.safeParse({
      name: 'User',
      email: 'user@company.com',
      cpf: '123.456',
      password: 'password123',
    })

    expect(result.success).toBe(false)
  })

  it('accepts valid payload in sign up', () => {
    const result = signUpSchema.safeParse({
      name: 'User',
      email: 'user@company.com',
      cpf: '123.456.789-01',
      password: 'password123',
    })

    expect(result.success).toBe(true)
  })
})

