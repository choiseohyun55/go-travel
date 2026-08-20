import { useState } from 'react'

import SidebarSection from '@/components/common/Sidebar/SidebarSection'
import ReservationDetailModal from '@/features/reservation/ReservationDetailModal'
import { useMyReservations } from '@/hooks/useReservation'
import type { ReservationItem } from '@/types/reservations'
import formatDateTime from '@/utils/formatDateTime'

const tabs = ['예약내역', '취소내역'] as const
const ranges = ['1개월', '3개월', '6개월'] as const
type Tab = (typeof tabs)[number]
type Range = (typeof ranges)[number]

export default function ReservationHistoryPage() {
  const [openDetail, setOpenDetail] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const [activeTab, setActiveTab] = useState<Tab>('예약내역')
  const [activeRange, setActiveRange] = useState<Range>('1개월')

  const { data: reservations = [], isPending } = useMyReservations()

  const filtered: ReservationItem[] = reservations.filter((r: ReservationItem) => {
    if (activeTab === '예약내역') return r.status !== 'CANCELLED'
    return r.status === 'CANCELLED'
  })

  return (
    <div className="justify-centerpy-10 flex min-h-screen">
      {/* 전체 레이아웃 */}
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

        {/* ⭐ 오른쪽 예약/취소내역 페이지 내용 */}
        <main className="flex-1 px-16 py-10">
          {/* 제목 */}
          <h1 className="mb-8 text-3xl font-bold">예약/취소내역</h1>

          {/* 상단 탭 영역 */}
          <div className="mb-8 flex border-b">
            {tabs.map((tab) => {
              const isActive = activeTab === tab
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-6 text-center text-lg font-semibold transition ${
                    isActive ? 'border-b-primary border-b-2' : 'text-gray-500'
                  }`}
                >
                  {tab}
                </button>
              )
            })}
          </div>

          {/* 기간 선택 */}
          <div className="mb-6 flex gap-2">
            {ranges.map((range) => {
              const isActive = activeRange === range
              return (
                <button
                  key={range}
                  type="button"
                  onClick={() => setActiveRange(range)}
                  className={`min-w-[80px] border px-6 py-2 text-sm font-medium ${
                    isActive
                      ? 'border-primary bg-primary text-white'
                      : 'border-border text-muted-foreground'
                  }`}
                >
                  {range}
                </button>
              )
            })}
          </div>

          {/* 테이블 영역 */}
          <div className="overflow-hidden rounded-md border border-gray-300">
            {/* 헤더 */}
            <div className="border-border bg-border/10 grid grid-cols-7 border-b text-center text-sm font-semibold">
              <div className="py-3">예약번호</div>
              <div className="py-3">예약일</div>
              <div className="py-3">상품명</div>
              <div className="py-3">출발일</div>
              <div className="py-3">인원</div>
              <div className="py-3">총금액</div>
              <div className="py-3">진행상황</div>
            </div>

            {/* 로딩 중 */}
            {isPending && (
              <div className="flex h-40 items-center justify-center text-sm text-gray-400">
                로딩 중...
              </div>
            )}

            {/* 내용 없을 때 */}
            {!isPending && filtered.length === 0 && (
              <div className="flex h-40 items-center justify-center text-sm text-gray-400">
                예약하신 내역이 없습니다.
              </div>
            )}

            {/* 실제 데이터 뿌려주기 */}
            {!isPending &&
              filtered.length > 0 &&
              filtered.map((item, index) => (
                <div
                  key={item.id}
                  className={`grid cursor-pointer grid-cols-7 border-b text-sm transition ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-yellow-50`}
                  onClick={() => {
                    setSelectedId(item.id)
                    setOpenDetail(true)
                  }}
                >
                  <div className="py-4 text-center font-medium text-gray-700">{item.id}</div>
                  <div className="px-2 py-4 text-center text-gray-600">
                    {formatDateTime(item.orderAt)}
                  </div>
                  <div className="px-2 py-4 text-center font-medium break-keep text-gray-800">
                    {item.productName}
                  </div>
                  <div className="px-2 py-4 text-center text-gray-600">
                    {item.deptDate.replace(/-/g, '.')}
                  </div>
                  <div className="py-4 text-center">{item.participants}명</div>
                  <div className="py-4 pr-3 text-right font-semibold">
                    {item.price.toLocaleString()}원
                  </div>
                  <div className="py-4 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        item.status === 'PENDING' && 'bg-yellow-200 text-yellow-800'
                      } ${item.status === 'CONFIRMED' && 'bg-green-200 text-green-800'} ${
                        item.status === 'CANCELLED' && 'bg-gray-300 text-gray-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </main>
      </div>

      {/* 예약 상세 모달 */}
      <ReservationDetailModal
        reservationId={selectedId}
        open={openDetail}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null)
          setOpenDetail(open)
        }}
      />
    </div>
  )
}
