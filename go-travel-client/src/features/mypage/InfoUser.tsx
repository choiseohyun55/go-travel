import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import SidebarSection from '@/components/common/Sidebar/SidebarSection'
// import { updateUserInfo } from '@/lib/api/user'
import { useAuthStore } from '@/stores/useAuthStore'

type UpdateUserForm = {
  name: string
  gender: 'M' | 'F'
  phoneNumber: string
  birthDate: string
}

export default function InfoChange() {
  const navigate = useNavigate()

  const email = useAuthStore((state) => state.email)
  const name = useAuthStore((state) => state.name)
  const hydrateFromToken = useAuthStore((state) => state.hydrateFromToken)

  const [form, setForm] = useState<UpdateUserForm>({
    name: '',
    gender: 'M',
    phoneNumber: '',
    birthDate: '',
  })

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    hydrateFromToken()
  }, [hydrateFromToken])

  // 최초 로드시 기존 사용자 정보 세팅 (DB 조회 API로 교체 가능)
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      name: name,
    }))
  }, [name])

  const handleChange = (field: keyof UpdateUserForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(null)

      // await updateUserInfo(form) // TODO: API 함수 구현 및 연동 필요

      navigate('/mypage') // 정보 수정 완료 후 마이페이지로 이동
    } catch (err) {
      console.error(err)
      setError('수정 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen justify-center bg-white py-10">
      <div className="flex w-full max-w-6xl">
        {/* 왼쪽 사이드바 */}
        <aside className="w-64 shrink-0 border border-gray-200 px-8 py-10">
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

        {/* 오른쪽 본문 */}
        <section className="flex-1 pl-16">
          {/* breadcrumb */}
          <div className="mb-4 flex justify-end text-sm text-gray-500">
            <span>홈 &gt; 마이페이지 &gt; 개인정보 수정</span>
          </div>

          {/* 제목 */}
          <div className="border-b border-gray-200 pb-6">
            <h1 className="text-2xl font-semibold tracking-tight">개인정보 수정</h1>
          </div>

          {/* 개인정보 폼 */}
          <form onSubmit={handleSubmit} className="mt-10 space-y-12">
            {/* 기본 정보 */}
            <section>
              <h2 className="mb-6 text-lg font-semibold">기본정보</h2>

              <div className="divide-y border border-gray-200">
                {/* 이메일 */}
                <div className="grid grid-cols-[200px_1fr] items-center px-6 py-4">
                  <label className="font-medium text-gray-700">이메일아이디</label>
                  <div className="flex items-center gap-3">
                    <span>{email}</span>
                    <button
                      type="button"
                      className="border border-gray-300 px-3 py-1 text-xs hover:bg-gray-50"
                    >
                      아이디 변경하기
                    </button>
                  </div>
                </div>

                {/* 이름 */}
                <div className="grid grid-cols-[200px_1fr] items-center px-6 py-4">
                  <label className="font-medium text-gray-700">이름(실명)</label>
                  <input
                    className="w-full border px-3 py-2"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                </div>

                {/* 성별 */}
                <div className="grid grid-cols-[200px_1fr] items-center px-6 py-4">
                  <label className="font-medium text-gray-700">성별</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={form.gender === 'M'}
                        onChange={() => handleChange('gender', 'M')}
                      />
                      남
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={form.gender === 'F'}
                        onChange={() => handleChange('gender', 'F')}
                      />
                      여
                    </label>
                  </div>
                </div>

                {/* 휴대폰 번호 */}
                <div className="grid grid-cols-[200px_1fr] items-center px-6 py-4">
                  <label className="font-medium text-gray-700">휴대폰 번호</label>
                  <input
                    className="w-full border px-3 py-2"
                    value={form.phoneNumber}
                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  />
                </div>

                {/* 생년월일 */}
                <div className="grid grid-cols-[200px_1fr] items-center px-6 py-4">
                  <label className="font-medium text-gray-700">생년월일</label>
                  <input
                    className="w-full border px-3 py-2"
                    value={form.birthDate}
                    onChange={(e) => handleChange('birthDate', e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* 오류 메시지 */}
            {error && <div className="text-sm text-red-500">{error}</div>}

            {/* 버튼 */}
            <div className="flex justify-center gap-4">
              <button
                type="button"
                className="h-12 w-32 bg-gray-600 font-medium text-white"
                onClick={() => navigate('/mypage')}
              >
                취소
              </button>

              <button
                type="submit"
                disabled={loading}
                className="h-12 w-32 bg-[#f7b500] font-semibold text-black hover:bg-[#f2a000]"
              >
                {loading ? '처리 중...' : '확인'}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}
