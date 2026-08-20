import SidebarSection from '@/components/common/Sidebar/SidebarSection'

export default function ReservationNumberSearchPage() {
  return (
    <div className="flex min-h-screen justify-center py-10">
      <div className="flex w-full max-w-6xl items-stretch">
        {/* ⭐ 왼쪽 마이페이지 사이드바 (공통) */}
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

        {/* ⭐ 오른쪽: 예약번호로 찾기 */}
        <main className="flex-1 px-16 py-10">
          {/* 제목 */}
          <h1 className="mb-8 text-3xl font-bold">예약번호로 찾기</h1>

          {/* 정보 테이블 박스 */}
          <section className="border-border border text-sm">
            {/* 이름 */}
            <div className="border-border grid grid-cols-[1fr_2fr] border-b">
              <div className="border-border bg-muted/10 border-r px-8 py-4 font-semibold">이름</div>
              <div className="px-8 py-4">홍길동</div>
            </div>

            {/* 생년월일 */}
            <div className="border-border grid grid-cols-[1fr_2fr] border-b">
              <div className="border-border bg-muted/10 border-r px-8 py-4 font-semibold">
                생년월일
              </div>
              <div className="px-8 py-4">2000.00.00</div>
            </div>

            {/* 예약번호 입력 */}
            <div className="grid grid-cols-[1fr_2fr]">
              <div className="border-border bg-muted/10 border-r px-8 py-4 font-semibold">
                예약번호
              </div>
              <div className="px-8 py-4">
                <input
                  type="text"
                  className="focus:border-ring border-border w-full border px-4 py-2 text-sm outline-none"
                  placeholder="예)R20251012001"
                />
              </div>
            </div>
          </section>

          {/* 검색 버튼 */}
          <div className="mt-10 flex justify-center">
            <button type="button" className="bg-primary w-52 py-4 text-sm font-semibold text-white">
              검색하기
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
