import { useState } from 'react'
import { CiCalendar } from 'react-icons/ci'
import { FaHeart, FaPlane, FaRegShareFromSquare } from 'react-icons/fa6'
import { HiSpeakerphone } from 'react-icons/hi'
import { MdOutlineBed, MdSecurity } from 'react-icons/md'
import { useParams } from 'react-router'

import CalendarModal from '@/features/reservation/CalendarModal'
import { useProductDetail } from '@/hooks/useProduct'
import { createMockReviews } from '@/utils/mock'
import { getStableRating } from '@/utils/rate'

const mockReviews = createMockReviews(3)

const features = (p = { days: 1 }) => [
  { icon: <CiCalendar className="text-[18px]" />, label: `${p.days - 1}박 ${p.days}일` },
  { icon: <FaPlane className="text-[15px]" />, label: '에어프레미아' },
  { icon: <HiSpeakerphone className="text-[18px]" />, label: '가이드포함' },
  { icon: <MdSecurity className="text-[18px]" />, label: '특별약관' },
  { icon: <MdOutlineBed className="text-[18px]" />, label: '싱글차지', sub: '50,000원' },
]

export default function PackageDetail() {
  const [count, setCount] = useState(1)
  const [showCalendar, setShowCalendar] = useState(false)

  const { id } = useParams()
  const productId = Number(id)

  const { data: p, isPending, isError } = useProductDetail(productId)
  if (isPending)
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">로딩 중...</div>
    )
  if (isError || !p) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        상품 정보를 불러오지 못했습니다.
      </div>
    )
  }

  const destination = p!.name.split(' ')[0] // 여행지
  const totalPrice = p.price * count // 총 가격

  return (
    <div className="min-h-screen pt-5">
      <main className="mx-auto max-w-6xl px-8 pb-16">
        {/* ====== 상단 패키지 정보 영역 ====== */}
        <section className="mb-12 flex justify-between">
          {/* 왼쪽 큰 이미지 */}
          <div className="h-80 w-[580px] overflow-hidden rounded-md lg:h-[360px]">
            <img src={p.imageUrl} alt={p.name} className="h-full w-full object-cover" />
          </div>

          {/* 오른쪽 텍스트 영역 */}
          <div className="flex w-[470px] flex-col justify-between">
            {/* 상단 태그 / 제목 / 별점 */}
            <div>
              <div className="mb-2 flex items-start justify-between">
                <span className="inline-block rounded-sm bg-[#e2ebff] px-2 py-1 text-[11px] font-semibold text-[#304f9e]">
                  해외 패키지
                </span>
                <div className="flex items-center text-sm">
                  <span className="mr-1 text-base text-red-500">★</span>
                  <span className="mr-1">{getStableRating(p.id)}</span>
                  <span className="text-gray-400">/ 5</span>
                </div>
              </div>
              <h1 className="mb-1 text-2xl font-bold">{p.name}</h1>
              <p className="text-muted-foreground mb-2 text-sm">
                #{p.city} #{destination} 여행
              </p>
              <p className="text-muted-foreground mb-1 text-sm">인천 ➜ {destination}</p>
              <p className="text-muted-foreground/50 text-sm">성인 1명</p>
            </div>

            {/* 하단: 위시/공유 + 가격 + 아이콘 목록 */}
            <div className="mt-6">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50">
                    <FaHeart />
                  </button>
                  <button className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50">
                    <FaRegShareFromSquare />
                  </button>
                </div>

                <p className="text-2xl font-bold">
                  {p.price.toLocaleString('ko-KR')}
                  <span className="ml-1 text-base font-semibold">원</span>
                </p>
              </div>

              {/* 아이콘 설명 라인 */}
              <ul className="text-accent-foreground mx-auto grid max-w-[600px] grid-cols-2 gap-3 text-xs sm:grid-cols-5">
                {features(p).map((f, i) => (
                  <li key={i} className="flex flex-col items-center">
                    <span className="mb-1 flex h-8 w-8 items-center justify-center rounded-full border border-gray-300">
                      {f.icon}
                    </span>
                    <span>{f.label}</span>
                    {f.sub && <span>{f.sub}</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ====== 리뷰 영역 ====== */}
        <section className="mb-12">
          {/* 상단 한 줄 요약 */}
          <div className="mb-4 flex items-center text-sm text-gray-800">
            <span className="mr-1 text-base text-[#ff7b00]">★</span>
            <span className="mr-1">{getStableRating(p.id)}</span>

            <span className="mr-1 text-gray-600">실제 여행객 {p.seats}명의 리뷰 보기</span>
            <span className="ml-1 text-xs text-gray-400">›</span>
          </div>

          {/* 리뷰 카드 리스트 */}
          <div className="grid gap-4 md:grid-cols-3">
            {mockReviews.map((r, idx) => (
              <article key={idx} className="border-border rounded-md border px-4 py-4 text-sm">
                <p className="mb-2 text-[13px] text-red-600">
                  <span className="mr-1">{'★★★★★'.slice(0, r.rating)}</span>
                  {r.rating}
                </p>
                <p className="mb-4 leading-snug">{r.text}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{r.author}</span>
                  <span>{r.date}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ====== 하단 상세 이미지 + 사이드 예약 카드 ====== */}
        <section className="mt-12">
          <div className="flex gap-8">
            {/* TODO: 왼쪽: 큰 이미지 영역 */}
            <div className="flex-1 overflow-hidden rounded-md border border-gray-200">
              <img src={p.detailUrl} alt="detail" className="h-full w-full object-cover" />
            </div>
            {/* 오른쪽: 예약 카드 */}
            <div className="w-[330px] shrink-0">
              <div className="sticky top-24 flex flex-col gap-4 rounded-md border border-gray-200 px-6 py-5">
                {/* TODO: 출발 / 도착 / 교통 */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <p className="text-gray-500">패키지명</p>
                    <p>{p.name}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-500">기간</p>
                    <p>
                      {p.days - 1}박 {p.days}일
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-500">출발지</p>
                    <p>인천공항</p>
                  </div>
                </div>

                {/* 인원수 */}
                <div className="border-border mt-2 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">인원수</p>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-sm"
                        onClick={() => setCount((c) => Math.max(1, c - 1))}
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-sm">{count}</span>
                      <button
                        type="button"
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-sm"
                        onClick={() => setCount((c) => Math.min(c + 1, 20))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* 가격 + 예약 버튼 */}
                <div className="mt-2 border-t border-gray-200 pt-4">
                  <p className="mb-3 text-xl font-bold">
                    {totalPrice.toLocaleString('ko-KR')}
                    <span className="ml-1 text-base">원 ~</span>
                  </p>

                  <button
                    type="button"
                    className="bg-primary h-11 w-full rounded-md text-sm font-semibold hover:bg-yellow-500"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowCalendar(true)
                    }}
                  >
                    예약하기
                  </button>
                  <CalendarModal
                    showModal={showCalendar}
                    setShowModal={setShowCalendar}
                    productId={p.id}
                    participants={count}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
