import { useState } from 'react'

import SidebarSection from '@/components/common/Sidebar/SidebarSection'

export default function PasswordChangePage() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setError(null)
    setSuccess(null)

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('모든 비밀번호를 입력해주세요.')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      setLoading(true)

      const token = localStorage.getItem('accessToken')

      const res = await fetch('/api/mypage/password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        const message = data?.message || '비밀번호 변경에 실패했습니다.'
        throw new Error(message)
      }

      setSuccess('비밀번호가 성공적으로 변경되었습니다.')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('알 수 없는 오류가 발생했습니다.')
      }
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
            <span>홈 &gt; 마이페이지 &gt; 개인정보 &gt; 비밀번호 변경</span>
          </div>

          {/* 제목 영역 */}
          <div className="border-b border-gray-200 pb-6">
            <h1 className="text-2xl font-semibold tracking-tight">비밀번호 변경</h1>
          </div>

          {/* 폼 영역 */}
          <div className="mt-10 flex justify-center">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-3xl border border-gray-200 bg-white px-10 py-12 shadow-sm"
            >
              {/* 에러 / 성공 메시지 */}
              {error && (
                <div className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 rounded border border-green-200 bg-green-50 px-4 py-3 text-xs text-green-600">
                  {success}
                </div>
              )}

              <div className="space-y-5">
                {/* 현재 비밀번호 */}
                <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                  <label className="text-sm font-medium text-gray-700">현재 비밀번호</label>
                  <div className="flex items-center gap-2">
                    <input
                      type={showCurrent ? 'text' : 'password'}
                      className="h-11 w-full rounded border border-gray-300 px-3 text-sm outline-none focus:border-black"
                      placeholder="현재 비밀번호를 입력하세요."
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent((prev) => !prev)}
                      className="rounded border border-gray-300 px-3 py-2 text-xs whitespace-nowrap text-gray-700 hover:bg-gray-50"
                    >
                      {showCurrent ? '숨기기' : '표시'}
                    </button>
                  </div>
                </div>

                {/* 새로운 비밀번호 */}
                <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                  <label className="text-sm font-medium text-gray-700">새로운 비밀번호</label>
                  <div className="flex items-center gap-2">
                    <input
                      type={showNew ? 'text' : 'password'}
                      className="h-11 w-full rounded border border-gray-300 px-3 text-sm outline-none focus:border-black"
                      placeholder="새로운 비밀번호를 입력하세요."
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew((prev) => !prev)}
                      className="rounded border border-gray-300 px-3 py-2 text-xs whitespace-nowrap text-gray-700 hover:bg-gray-50"
                    >
                      {showNew ? '숨기기' : '표시'}
                    </button>
                  </div>
                </div>

                {/* 비밀번호 확인 */}
                <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                  <label className="text-sm font-medium text-gray-700">비밀번호 확인</label>
                  <div className="flex items-center gap-2">
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      className="h-11 w-full rounded border border-gray-300 px-3 text-sm outline-none focus:border-black"
                      placeholder="확인을 위해 한번 더 입력하세요."
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((prev) => !prev)}
                      className="rounded border border-gray-300 px-3 py-2 text-xs whitespace-nowrap text-gray-700 hover:bg-gray-50"
                    >
                      {showConfirm ? '숨기기' : '표시'}
                    </button>
                  </div>
                </div>
              </div>

              {/* 안내 문구 */}
              <div className="mt-6 pl-[140px]">
                <p className="text-xs leading-5 text-red-500">
                  * 영문(대/소문자), 숫자, 특수문자 중 2가지 종류 이상을 조합하여 최소 10자리 이상
                  또는 영문(대/소문자), 숫자, 특수문자 중 3가지 종류 이상을 조합하여 최소 8자리
                  이상으로 사용하실 수 있습니다.
                </p>
              </div>

              {/* 변경 버튼 */}
              <div className="mt-10 flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="h-14 w-44 bg-[#f7b500] text-base font-semibold text-black hover:bg-[#f5a800] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? '변경 중...' : '변경하기'}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}
