// src/features/auth/schema/signupSchema.ts
import { z } from 'zod'

export const signupSchema = z
  .object({
    email: z.email('이메일을 입력해주세요.'),

    password: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .regex(/[A-Za-z]/, '영문을 최소 1자 포함해주세요.')
      .regex(/\d/, '숫자를 최소 1자 포함해주세요.'),

    passwordConfirm: z.string(),

    name: z
      .string()
      .min(2, '이름은 한글로 두 글자 이상 입력해주세요.')
      .regex(/^[가-힣]+$/, '올바른 형식의 이름을 입력해주세요.'),

    phone: z
      .string()
      .optional()
      .refine((v) => !v || /^01\d{8,9}$/.test(v.replace(/\D/g, '')), {
        message: '올바른 형식의 전화번호를 입력해주세요.',
      }),

    agreeTerms: z.boolean().refine((v) => v, '필수 약관에 동의해주세요.'),
    agreePrivacy: z.boolean().refine((v) => v, '필수 약관에 동의해주세요.'),
    agreeMarketing: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.passwordConfirm.trim() === '') return true
      return data.password === data.passwordConfirm
    },
    {
      message: '비밀번호가 일치하지 않습니다.',
      path: ['passwordConfirm'],
    }
  )

export type SignupFormValues = z.infer<typeof signupSchema>
