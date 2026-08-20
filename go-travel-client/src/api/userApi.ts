import { api } from '@/lib/axios'
import { useAuthStore } from '@/stores/useAuthStore'
import type { LoginRequestDto, LoginResponse, SignupRequestDto } from '@/types/auth'

export const registerUser = (data: SignupRequestDto) =>
  api.post('/users/register', data).then((res) => res.data)

export const loginUser = async (data: LoginRequestDto): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>('/users/login', data)
  const token = res.data.token
  if (token) useAuthStore.getState().login(token)
  return res.data
}

export const checkDuplicateEmail = async (email: string) => {
  const res = await api.post('/users/email-exists', { email }, { withCredentials: false })
  return res.data as boolean
}
