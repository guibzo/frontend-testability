import { describe, expect, it } from 'vitest'

import { cpfDigitsOnly, formatCpf } from './format-cpf'

describe('formatCpf', () => {
  it('formats cpf progressively', () => {
    expect(formatCpf('123')).toBe('123')
    expect(formatCpf('1234')).toBe('123.4')
    expect(formatCpf('12345678901')).toBe('123.456.789-01')
  })

  it('keeps only digits', () => {
    expect(cpfDigitsOnly('123.456.789-01')).toBe('12345678901')
  })
})

