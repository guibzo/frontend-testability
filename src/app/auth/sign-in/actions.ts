'use server'

import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { type SignInSchema, signInSchema, type SignUpSchema,signUpSchema } from '@/utils/auth-form-schema'

export type AuthActionState = {
  status: 'idle' | 'error'
  message: string
}

const parseErrorMessage = (error: unknown) => {
  if (error instanceof Error && error.message) return error.message
  return 'Unable to authenticate user.'
}

export const signInAction = async (
  _previousState: AuthActionState,
  values: SignInSchema,
): Promise<AuthActionState> => {
  const parsedData = signInSchema.safeParse(values)

  if (!parsedData.success) {
    return {
      status: 'error',
      message: parsedData.error.issues[0]?.message || 'Invalid form data.',
    }
  }

  try {
    await auth.api.signInEmail({
      body: parsedData.data,
    })
  } catch (error) {
    return {
      status: 'error',
      message: parseErrorMessage(error),
    }
  }

  redirect('/admin')
}

export const signUpAction = async (
  _previousState: AuthActionState,
  values: SignUpSchema,
): Promise<AuthActionState> => {
  const parsedData = signUpSchema.safeParse(values)

  if (!parsedData.success) {
    return {
      status: 'error',
      message: parsedData.error.issues[0]?.message || 'Invalid form data.',
    }
  }

  const { name, email, password } = parsedData.data

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    })
  } catch (error) {
    return {
      status: 'error',
      message: parseErrorMessage(error),
    }
  }

  redirect('/admin')
}

export const signOutAction = async () => {
  await auth.api.signOut()
  redirect('/auth/sign-in')
}
