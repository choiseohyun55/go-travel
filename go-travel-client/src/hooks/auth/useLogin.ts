import { loginUser } from '@/api/userApi'
import type { LoginRequestDto, LoginResponse } from '@/types/auth'
import { useMutation } from '@tanstack/react-query'

export const useLogin = () =>
  useMutation<LoginResponse, Error, LoginRequestDto>({
    mutationFn: (data: LoginRequestDto) => loginUser(data),
  })
