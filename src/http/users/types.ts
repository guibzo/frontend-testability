export type ExternalUser = {
  id: number
  name: string
  email: string
  company?: {
    name?: string
  } | null
}

export type User = {
  id: number
  name: string
  email: string
  company: string
}

