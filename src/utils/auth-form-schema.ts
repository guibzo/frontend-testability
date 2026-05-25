import { z } from 'zod'

import { cpfDigitsOnly } from '@/utils/format-cpf'

const cpfSchema = z
  .string()
  .transform(cpfDigitsOnly)
  .refine(value => value.length === 11, 'CPF must contain 11 digits.')

export const signInSchema = z.object({
  email: z.string().email('Invalid email format.'),
  password: z.string().min(8, 'Password must have at least 8 characters.'),
})

export const signUpSchema = signInSchema.extend({
  name: z.string().min(2, 'Name must have at least 2 characters.'),
  cpf: cpfSchema,
})

export type SignInSchema = z.infer<typeof signInSchema>
export type SignUpSchema = z.infer<typeof signUpSchema>

