import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { verifyPassword } from '@/api/authApi'
import SidebarSection from '@/components/common/Sidebar/SidebarSection'
import { useAuthStore } from '@/stores/useAuthStore'

export default function PasswordVerifyPage() {
  const navigator = useNavigate()

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const email = useAuthStore((state) => state.email)
  const hydrateFromToken = useAuthStore((state) => state.hydrateFromToken)

  // 첫 로드시 토큰 정보 불러오기
  useEffect(() => {
    hydrateFromToken()
  }, [hydrateFromToken])

  const userId = email

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!password) {
      setError('비밀번호를 입력해주세요.')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const data = await verifyPassword(password)

      if (data.success) {
        console.log('비밀번호 인증 성공:', data)
        navigator('/mypage/infochange')
      } else {
        console.log('비밀번호 인증 실패:', data)
        setError(data.message || '비밀번호가 일치하지 않습니다.')
      }
    } catch (err) {
      console.error(err)
      setError('일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen justify-center py-10">
      <div className="flex w-full max-w-6xl items-stretch">
        {/* 왼쪽 사이드바 */}
        <aside className="border-border w-64 shrink-0 border px-8 py-10">
          <h2 className="mb-10 text-2xl font-bold">마이페이지</h2>

          <SidebarSection
            title="예약 / 취소내역"
            defaultOpen={true}
            items={[
              { label: '예약/ 취소내역', path: '/mypage/resHis' },
              { label: '예약번호로 찾기', path: '/mypage/resNum' },
            ]}
          />

          <SidebarSection
            title="관심상품"
            items={[
              { label: '찜한 상품', path: '/mypage/wishlist' },
              { label: '최근 본 상품', path: '/mypage/recent' },
            ]}
          />

          <SidebarSection
            title="개인정보"
            items={[
              { label: '회원정보 수정', path: '/mypage/pwverify' },
              { label: '비밀번호 변경', path: '/mypage/changepw' },
              { label: '회원 탈퇴', path: '/mypage/withdraw' },
            ]}
          />
        </aside>

        {/* 오른쪽 본문 영역 */}
        <section className="flex-1 pl-16">
          {/* 상단 breadcrumb */}
          <div className="mb-4 flex justify-end text-sm text-gray-500">
            <span>홈 &gt; 마이페이지 &gt; 비밀번호 인증</span>
          </div>

          {/* 제목 영역 */}
          <div className="border-b border-gray-200 pb-6">
            <h1 className="text-2xl font-semibold tracking-tight">비밀번호 인증</h1>
          </div>

          {/* 설명 문구 */}
          <div className="mt-10 text-center">
            <p className="text-lg font-semibold">
              고객님의 소중한 정보를 보호하기 위해
              <br />
              비밀번호를 다시 확인합니다.
            </p>
          </div>

          {/* 카드 영역 */}
          <div className="mt-10 flex justify-center">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-3xl border border-gray-200 px-10 py-10 shadow-sm"
            >
              {/* 아이디 / 비밀번호 영역 */}
              <div className="space-y-6">
                {/* 아이디 */}
                <div className="grid grid-cols-[90px_1fr] items-center gap-4">
                  <label className="text-sm font-medium">아이디</label>
                  <div className="text-sm">{userId}</div>
                </div>

                {/* 비밀번호 */}
                <div className="grid grid-cols-[90px_1fr] items-center gap-4">
                  <label className="text-sm font-medium">비밀번호</label>
                  <div className="flex items-center gap-2">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="h-11 w-full rounded border border-gray-300 px-3 text-sm outline-none focus:border-black"
                      placeholder="비밀번호를 입력하세요."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="rounded border border-gray-300 px-3 py-2 text-xs whitespace-nowrap hover:bg-gray-50 hover:text-gray-500"
                    >
                      {showPassword ? '숨기기' : '표시'}
                    </button>
                  </div>
                </div>
              </div>

              {/* 에러 메시지 */}
              {error && <div className="mt-6 text-center text-sm text-red-500">{error}</div>}

              {/* 확인 버튼 */}
              <div className="mt-10 flex justify-center">
                <button
                  type="submit"
                  className="bg-primary h-16 w-40 text-lg font-semibold text-black hover:bg-[#f5a800]"
                >
                  확인
                </button>
              </div>

              {/* SNS 인증 영역 */}
              <div className="bg-border/50 mt-10 px-6 py-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs">
                    SNS로 가입 또는 로그인한 고객님은 SNS 재 인증을 진행해주세요.
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="h-10 rounded border border-gray-300 px-4 text-xs"
                    disabled
                  >
                    네이버 인증
                  </button>
                  <button
                    type="button"
                    className="h-10 rounded border border-gray-300 px-4 text-xs"
                  >
                    카카오톡 인증
                  </button>
                  <button
                    type="button"
                    className="h-10 rounded border border-gray-300 px-4 text-xs"
                  >
                    애플 인증
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}
