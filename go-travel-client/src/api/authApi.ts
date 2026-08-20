import { api } from '@/lib/axios'

export const verifyPassword = async (password: string) => {
  const res = await api.post('/users/me/password/verify', { password })
  return res.data as { success: boolean; message: string }
}
