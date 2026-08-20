import { useEffect } from 'react'
import { Link } from 'react-router'

import time from '@/assets/images/mypage/time.png'
import user from '@/assets/images/mypage/user.png'
import wishlist from '@/assets/images/mypage/wishlist.png'
import SidebarSection from '@/components/common/Sidebar/SidebarSection'
import { useAuthStore } from '@/stores/useAuthStore'

export default function MyPage() {
  const { name, hydrateFromToken } = useAuthStore()

  // 컴포넌트 마운트 시 상태 초기화
  useEffect(() => {
    hydrateFromToken()
  }, [hydrateFromToken])

  return (
    <div className="flex min-h-screen justify-center py-10">
      <div className="flex w-full max-w-6xl items-stretch">
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

        {/* 메인 영역 (테두리 없음) */}
        <main className="flex-1 px-16 py-10">
          <h1 className="mb-12 text-[32px] font-bold tracking-tight">
            안녕하세요, <span className="text-primary">{name}님!</span>
          </h1>

          {/* 카드 3개 */}
          <section className="mb-14 flex gap-16">
            {[
              { label: '개인정보 수정', icon: user, link: '/mypage/pwverify' },
              { label: '예약내역 확인', icon: time, link: '/mypage/resHis' },
              { label: '찜 한 상품', icon: wishlist, link: '/mypage/wishlist' },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.link}
                className="hover:bg-accent/20 flex h-44 w-60 flex-col items-center justify-center rounded-2xl transition"
              >
                <img src={item.icon} className="mb-3 h-12 w-12" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </section>

          {/* 최근 예약내역 */}
          <section className="mb-6">
            <h2 className="mb-3 text-lg font-semibold">최근 예약내역</h2>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">최근 1개월 예약 내역이 없습니다.</p>

              <div className="space-x-2">
                <Link to="/mypage/ResNum" className="border border-gray-700 px-5 py-2 text-sm">
                  예약 찾기
                </Link>
                <Link to="/mypage/ResHis" className="border border-gray-400 px-5 py-2 text-sm">
                  전체 보기
                </Link>
              </div>
            </div>
          </section>

          {/* 안내 문구 */}
          <div className="mt-12 space-y-1 text-[11px] leading-relaxed text-gray-500">
            <p>
              • [항공] 노랑풍선 비회원, 네이버, 카약, 스카이스캐너 예약은 비회원 예약조회에서 확인
              가능합니다.
            </p>
            <p>
              • [항공] 지마켓, 11번가 등 제휴 예약은 해당 제휴사 마이페이지에서 확인 부탁드립니다.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
