'use client'

import { useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { Logo } from '@/components/common/Logo'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useCheckEmail, useRegister } from '@/hooks/auth/useRegister'
import type { SignupFormValues, SignupRequestDto } from '@/types/auth'
import { signupSchema } from '@/types/signupSchema'
import { formatPhone } from '@/utils/phone'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

export default function SignupForm() {
  const navigate = useNavigate()
  const { mutateAsync: registerUser, isPending } = useRegister()
  const { mutateAsync: checkEmail, isPending: isCheckingEmail } = useCheckEmail()

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
    setValue,
  } = useForm<SignupFormValues>({
    mode: 'onChange',
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
      phone: '',
      agreeTerms: false,
      agreePrivacy: false,
      agreeMarketing: false,
    },
  })

  const email = useWatch({ control, name: 'email' })
  const agreeTerms = useWatch({ control, name: 'agreeTerms' })
  const agreePrivacy = useWatch({ control, name: 'agreePrivacy' })
  const agreeMarketing = useWatch({ control, name: 'agreeMarketing' })

  const allChecked = agreeTerms && agreePrivacy && agreeMarketing
  const canSubmit = isValid && !isPending

  // 전체 동의 토글
  const handleToggleAll = (checked: boolean) => {
    setValue('agreeTerms', checked, { shouldValidate: true })
    setValue('agreePrivacy', checked, { shouldValidate: true })
    setValue('agreeMarketing', checked)
  }

  // 이메일 중복 체크 여부
  const [emailChecked, setEmailChecked] = useState<null | boolean>(null)

  // 이메일 중복 확인
  const handleEmailCheck = async () => {
    if (!email) {
      toast.error('이메일을 입력해주세요.')
      return
    }

    try {
      const exists = await checkEmail(email)
      if (exists) setEmailChecked(true)
      else setEmailChecked(false)
    } catch {
      toast.error('중복 확인 중 오류가 발생했습니다.')
    }
  }

  const onSubmit = async (values: SignupFormValues) => {
    if (emailChecked !== false) {
      toast.error('이메일 중복 확인을 완료해주세요.')
      return
    }

    const dto: SignupRequestDto = {
      email: values.email,
      password: values.password,
      name: values.name,
      phone: values.phone ? values.phone.replace(/\D/g, '') : null,
    }

    try {
      await registerUser(dto)
      navigate('/signup/success', { replace: true })
    } catch {
      toast.error('회원가입 실패', {
        description: '잠시 후 다시 시도해주세요.',
      })
    }
  }

  return (
    <>
      {/* 로고 */}
      <Logo className="mb-8" subtitle="여행가자 회원으로 더 많은 혜택을 누려보세요." />

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
        <FieldSet className="gap-6">
          {/* 이메일 */}
          <Field>
            <FieldLabel htmlFor="email">
              이메일 주소 <span className="text-destructive">*</span>
            </FieldLabel>
            <FieldContent>
              <div className="flex gap-2">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="example@email.com"
                      onChange={(e) => {
                        field.onChange(e)
                        setEmailChecked(null) // 입력 바뀌면 중복 확인 다시 해야됨
                      }}
                    />
                  )}
                />
                <Button
                  type="button"
                  onClick={handleEmailCheck}
                  className="shrink-0 whitespace-nowrap"
                  disabled={
                    !email || // 입력이 없는 경우
                    !!errors.email || // 유효성 검사에 실패한 경우
                    isCheckingEmail || // API 요청 중인 경우
                    emailChecked === false // 이미 중복 확인에 성공한 경우
                  }
                >
                  {isCheckingEmail ? '확인중...' : '중복확인'}
                </Button>
              </div>
              <FieldError errors={[errors.email]} />

              {emailChecked === false && (
                <p className="mt-1 text-sm font-medium text-green-600">
                  ✓ 사용 가능한 이메일입니다.
                </p>
              )}
              {emailChecked === true && (
                <p className="text-destructive mt-1 text-sm font-medium">
                  이미 사용 중인 이메일입니다.
                </p>
              )}
            </FieldContent>
          </Field>

          {/* 비밀번호 */}
          <Field>
            <FieldLabel htmlFor="password">
              비밀번호 <span className="text-destructive">*</span>
            </FieldLabel>
            <FieldContent>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="영문과 숫자를 포함한 8자 이상"
                    onChange={(e) => {
                      field.onChange(e)
                      trigger('passwordConfirm')
                    }}
                  />
                )}
              />
              <FieldError errors={[errors.password]} />
            </FieldContent>
          </Field>

          {/* 비밀번호 확인 */}
          <Field>
            <FieldLabel htmlFor="passwordConfirm">
              비밀번호 확인 <span className="text-destructive">*</span>
            </FieldLabel>
            <FieldContent>
              <Controller
                name="passwordConfirm"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="passwordConfirm"
                    type="password"
                    autoComplete="new-password"
                    placeholder="비밀번호를 다시 입력해주세요."
                  />
                )}
              />
              <FieldError errors={[errors.passwordConfirm]} />
            </FieldContent>
          </Field>

          {/* 이름 */}
          <Field>
            <FieldLabel htmlFor="name">
              이름 <span className="text-destructive">*</span>
            </FieldLabel>
            <FieldContent>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="name"
                    type="text"
                    placeholder="실명을 입력해주세요."
                    autoComplete="name"
                  />
                )}
              />
              <FieldError errors={[errors.name]} />
            </FieldContent>
          </Field>

          {/* 휴대폰 */}
          <Field>
            <FieldLabel htmlFor="phone">휴대폰 번호</FieldLabel>
            <FieldContent>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="010-0000-0000"
                    maxLength={13}
                    onChange={(e) => {
                      const formatted = formatPhone(e.target.value)
                      e.target.value = formatted
                      field.onChange(formatted)
                    }}
                  />
                )}
              />
              <FieldError errors={[errors.phone]} />
            </FieldContent>
          </Field>
        </FieldSet>

        {/* 약관 */}
        <section className="bg-border/20 rounded-lg border border-gray-200 p-6">
          <h3 className="mb-4 text-lg font-semibold">약관 동의</h3>
          <FieldGroup className="gap-4">
            {/* 전체 동의 */}
            <Field orientation="horizontal" className="items-center">
              <Checkbox
                id="agreeAll"
                checked={allChecked}
                onCheckedChange={(c) => handleToggleAll(!!c)}
                className="border-primary size-5"
              />
              <FieldContent>
                <FieldLabel htmlFor="agreeAll" className="text-base font-medium">
                  전체 동의
                </FieldLabel>
                <FieldDescription>필수 및 선택 항목에 모두 동의합니다.</FieldDescription>
              </FieldContent>
            </Field>

            <div className="h-px w-full bg-gray-200" />

            {/* 필수: 이용약관 */}
            <Field orientation="horizontal" className="items-start gap-4">
              <Controller
                name="agreeTerms"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="agreeTerms"
                    checked={field.value}
                    onCheckedChange={(c) => field.onChange(!!c)}
                    className="border-muted mt-1 size-4"
                  />
                )}
              />
              <FieldContent>
                <FieldLabel htmlFor="agreeTerms" className="text-sm font-medium">
                  (필수) 서비스 이용약관 동의
                </FieldLabel>
                <FieldDescription>
                  여행 예약 및 결제, 고객 상담을 위해 필요한 기본 약관입니다.
                </FieldDescription>
                <FieldError errors={[errors.agreeTerms]} />
              </FieldContent>
            </Field>

            {/* 필수: 개인정보 */}
            <Field orientation="horizontal" className="items-start gap-4">
              <Controller
                name="agreePrivacy"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="agreePrivacy"
                    checked={field.value}
                    onCheckedChange={(c) => field.onChange(!!c)}
                    className="border-muted mt-1 size-4"
                  />
                )}
              />
              <FieldContent>
                <FieldLabel htmlFor="agreePrivacy" className="text-sm font-medium">
                  (필수) 개인정보 수집·이용 동의
                </FieldLabel>
                <FieldDescription>
                  예약 이행 및 맞춤 서비스 제공을 위해 수집·이용됩니다.
                </FieldDescription>
                <FieldError errors={[errors.agreePrivacy]} />
              </FieldContent>
            </Field>

            {/* 선택: 마케팅 */}
            <Field orientation="horizontal" className="items-start gap-4">
              <Controller
                name="agreeMarketing"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="agreeMarketing"
                    checked={field.value}
                    onCheckedChange={(c) => field.onChange(!!c)}
                    className="border-muted mt-1 size-4"
                  />
                )}
              />
              <FieldContent>
                <FieldLabel htmlFor="agreeMarketing" className="text-sm font-medium">
                  (선택) 마케팅 정보 수신 동의
                </FieldLabel>
                <FieldDescription>
                  이벤트, 할인 혜택, 여행 소식을 받아볼 수 있습니다.
                </FieldDescription>
              </FieldContent>
            </Field>
          </FieldGroup>
        </section>

        {/* 버튼 */}
        <Button
          type="submit"
          disabled={!canSubmit}
          className="bg-primary text-primary-foreground w-full py-7 text-lg font-semibold transition-colors hover:bg-[#f2a200] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? '회원가입 처리중...' : '회원가입 완료'}
        </Button>
      </form>
    </>
  )
}
