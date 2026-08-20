import { checkDuplicateEmail, registerUser } from '@/api/userApi'
import type { SignupRequestDto } from '@/types/auth'
import { useMutation } from '@tanstack/react-query'

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: SignupRequestDto) => registerUser(data),
  })
}

export const useCheckEmail = () =>
  useMutation({
    mutationFn: (email: string) => checkDuplicateEmail(email),
  })
