import { useState } from 'react'
import { useNavigate } from 'react-router'

import SidebarSection from '@/components/common/Sidebar/SidebarSection'

// 더미 데이터
const dummyProducts = [
  {
    id: 2,
    name: '오사카 맛집 탐방 4일',
    region: '오사카',
    price: 1500000,
    imageUrl: '/images/package/osaka.jpg',
  },
  {
    id: 1,
    name: '도쿄 벚꽃 여행 3일',
    region: '도쿄',
    price: 800000,
    imageUrl: '/images/package/tokyo.jpg',
  },
]

export default function WishList() {
  const navigate = useNavigate()
  const [showCalendar, setShowCalendar] = useState(false)

  const products = dummyProducts // 더미 데이터 사용
  const isPending = false
  const isError = false

  if (isError) console.error('상품을 불러오지 못했습니다.')
  if (isPending) return <div className="p-20 text-center">로딩 중...</div>

  return (
    <div className="justify-centerpy-10 flex min-h-screen">
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

        {/* 오른쪽 찜한 상품 내용  */}
        <main className="flex-1 px-16 py-10">
          {/* 제목 */}
          <h1 className="mb-8 text-3xl font-bold">찜한 상품</h1>
          <section className="flex flex-1 flex-col gap-5">
            {products.length === 0 ? (
              <div className="p-20 text-center text-gray-500">찜한 상품이 없습니다.</div>
            ) : (
              products.map((p) => (
                <article
                  key={p.id}
                  className="border-border flex cursor-pointer border"
                  onClick={() => navigate(`/products/${p.id}`)}
                >
                  {/* 썸네일 */}
                  <div className="h-44 w-72 overflow-hidden">
                    <img src={p.imageUrl} alt={p.name} className="h-full w-full object-cover" />
                  </div>

                  {/* 정보 영역 */}
                  <div className="flex flex-1 flex-col justify-between px-8 py-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="mb-2 inline-block rounded-sm bg-[#e2ebff] px-2 py-1 text-[11px] font-semibold text-[#304f9e]">
                          해외패키지
                        </span>
                        <h3 className="text-[18px] font-semibold">{p.name}</h3>
                        <p className="mt-1 text-[13px] text-gray-500">패키지 ▸ {p.region}</p>
                      </div>

                      {/* 평점 더미 */}
                      <div className="flex items-center text-sm">
                        <span className="mr-1 text-base text-red-500">★</span>
                        <span className="mr-1">5</span>
                        <span className="text-gray-400">/ 5</span>
                      </div>
                    </div>

                    {/* 하단 가격 */}
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-[19px] font-bold text-[#d32f2f]">
                        {p.price.toLocaleString('ko-KR')}원~
                      </p>
                    </div>
                  </div>
                </article>
              ))
            )}
          </section>
        </main>
      </div>
    </div>
  )
}
