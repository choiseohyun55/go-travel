'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { RiKakaoTalkFill } from 'react-icons/ri'
import { SiApple, SiNaver } from 'react-icons/si'
import { Link, useLocation, useNavigate } from 'react-router'

import { Logo } from '@/components/common/Logo'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldLabel, FieldSet } from '@/components/ui/field'
import { useLogin } from '@/hooks/auth/useLogin'
import type { LoginRequestDto } from '@/types/auth'
import { toast } from 'sonner'

export default function Login() {
  const [showPw, setShowPw] = useState(false)
  const [saveId, setSaveId] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  const { register, handleSubmit } = useForm<LoginRequestDto>()
  const { mutate, isPending } = useLogin()

  const onSubmit = async (values: LoginRequestDto) => {
    mutate(values, {
      onSuccess: (data) => {
        const token = data?.token

        if (token) {
          localStorage.setItem('accessToken', token)
        } else {
          console.warn('⚠ token이 응답에 없습니다:', data)
        }

        navigate(from, { replace: true })
      },
      onError: (err) => {
        console.error(err)
        toast.error('로그인 실패', {
          description: '잠시 후 다시 시도해주세요.',
        })
      },
    })
  }

  return (
    <>
      <Logo className="mb-8" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          {/* 이메일 */}
          <Field>
            <input
              type="email"
              placeholder="이메일 주소"
              className="focus:border-primary focus:ring-primary/40 w-full rounded-md border p-3 text-sm focus:ring-1"
              required
              {...register('email')}
            />
          </Field>

          {/* 비밀번호 */}
          <Field>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="비밀번호 확인"
                className="focus:border-primary focus:ring-primary/40 w-full rounded-md border p-3 text-sm focus:ring-1"
                required
                {...register('password')}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-gray-600 underline"
                onClick={() => setShowPw(!showPw)}
              >
                {showPw ? '비밀번호 숨기기' : '비밀번호 표시'}
              </button>
            </div>
          </Field>

          {/* 아이디 저장 */}
          <div className="flex items-center justify-between text-[13px]">
            <div className="relative inline-flex items-center gap-2">
              <Checkbox
                id="saveId"
                checked={saveId}
                onCheckedChange={(v) => setSaveId(!!v)}
                className="accent-primary h-4 w-4 border-gray-400"
              />
              <FieldLabel htmlFor="saveId" className="text-sub relative cursor-pointer select-none">
                아이디 저장
              </FieldLabel>

              {saveId && (
                <div className="text-muted-foreground ml-3">
                  개인정보 보호를 위해, 개인PC에서만 사용해주세요.
                </div>
              )}
            </div>
          </div>
        </FieldSet>

        {/* 로그인 버튼 */}
        <Button
          type="submit"
          disabled={isPending}
          className="bg-primary text-primary-foreground mt-6 w-full rounded-md py-7 text-lg font-semibold transition-colors hover:bg-[#f2a200]"
        >
          로그인
        </Button>

        {/* 아이디/비밀번호 찾기 | 회원가입 */}
        <div className="mt-5 text-sm text-[#666]">
          <Link to="/find_account" className="text-[#444] hover:underline">
            아이디/비밀번호 찾기
          </Link>
          <span className="mx-2 text-[#ccc]">|</span>
          <Link to="/signup" className="text-[#444] hover:underline">
            회원가입
          </Link>
        </div>

        {/* 소셜 로그인 */}
        <div className="my-8 flex justify-center gap-5">
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-(--brand-naver) text-white transition-transform hover:scale-105"
          >
            <SiNaver size={20} />
          </button>
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-(--brand-kakao) text-[#3B1E1E] transition-transform hover:scale-105"
          >
            <RiKakaoTalkFill size={24} />
          </button>
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-(--brand-apple) text-white transition-transform hover:scale-105"
          >
            <SiApple size={20} />
          </button>
        </div>

        {/* 안내 문구 */}
        <p className="text-sub text-sm leading-relaxed">
          * 여행가자 회원으로 가입하시면 포인트적립(일부 상품 제외), 회원전용혜택 제공 등 더 많은
          서비스를 이용하실 수 있습니다.
        </p>
      </form>

      <footer className="text-muted mt-12 text-center text-sm">
        © Let's go tour. All Rights Reserved.
      </footer>
    </>
  )
}
