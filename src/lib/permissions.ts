export type UserPermissions = {
  canReserveStock: boolean
  canManagePricing: boolean
}

export const getUserPermissions = ({ email }: { email: string }): UserPermissions => {
  const normalizedEmail = email.toLowerCase()
  const isViewer = normalizedEmail.includes('viewer')

  if (isViewer) {
    return {
      canReserveStock: false,
      canManagePricing: false,
    }
  }

  return {
    canReserveStock: true,
    canManagePricing: true,
  }
}

