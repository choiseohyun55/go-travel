export type SignupFormValues = {
  email: string
  password: string
  passwordConfirm: string
  name: string
  phone?: string
  agreeTerms: boolean
  agreePrivacy: boolean
  agreeMarketing?: boolean
}

export interface SignupRequestDto {
  email: string
  password: string
  name: string
  phone: string | null
}

export interface LoginRequestDto {
  email: string
  password: string
}

export type LoginResponse = {
  token?: string
  raw: unknown
  headers?: Record<string, unknown>
}
