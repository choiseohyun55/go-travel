import { useState } from 'react'
import { useNavigate } from 'react-router'

import SearchSidebar from '@/components/common/Sidebar/SearchSideBar'
import { useFilteredProductsByLocationId } from '@/hooks/useProduct'
import type { SortOption } from '@/hooks/useProduct'
import { NAV_DATA } from '@/types/navData'
import type { TravelPackage } from '@/types/product'
import { getStableRating } from '@/utils/rate'
import { toast } from 'sonner'

interface Props {
  locationId: number
}

function getLocationName(locationId: number): string {
  for (const region of Object.values(NAV_DATA)) {
    const found = region.items.find((item) => item.id === locationId)
    if (found) return found.name
  }
  return ''
}

export default function SearchByLocation({ locationId }: Props) {
  const navigate = useNavigate()
  const [filters, setFilters] = useState<{ days: number[]; price: number[] }>({
    days: [],
    price: [],
  })
  const locationName = getLocationName(locationId)
  const [sortOption, setSortOption] = useState<SortOption>('default')

  const {
    data: products = [],
    isLoading,
    isError,
  } = useFilteredProductsByLocationId(locationId, filters, sortOption)
  if (isError) {
    toast.error('상품을 불러오지 못했습니다.')
  }
  if (isLoading) return <div className="p-20 text-center">로딩 중....</div>
  return (
    <div className="min-h-screen pt-5">
      <main className="mx-auto max-w-6xl px-8">
        <section className="mb-8 flex items-end justify-between">
          {/* 지역명 */}
          <div className="flex items-center gap-3">
            <div className="bg-primary flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white">
              ●
            </div>
            <h1 className="text-foreground/90 dark:text-foreground/95 text-[30px] font-extrabold">
              {locationName}
            </h1>
          </div>

          {/* 정렬 텍스트 (기본순만 살짝 진하게) */}
          <div className="flex items-center text-sm text-gray-500">
            <span
              className={`font-semibold ${sortOption === 'default' ? 'text-gray-800' : 'text-gray-500'}`}
              onClick={() => setSortOption('default')}
            >
              기본순
            </span>
            <span className="mx-2 text-gray-300">|</span>
            <span
              className={`cursor-pointer hover:text-gray-800 ${sortOption === 'rating' ? 'text-gray-800' : ''}`}
              onClick={() => setSortOption('rating')}
            >
              별점순
            </span>
            <span className="mx-2 text-gray-300">|</span>
            <span
              className={`cursor-pointer hover:text-gray-800 ${sortOption === 'priceAsc' ? 'text-gray-800' : ''}`}
              onClick={() => setSortOption('priceAsc')}
            >
              낮은가격순
            </span>
            <span className="mx-2 text-gray-300">|</span>
            <span
              className={`cursor-pointer hover:text-gray-800 ${sortOption === 'priceDesc' ? 'text-gray-800' : ''}`}
              onClick={() => setSortOption('priceDesc')}
            >
              높은가격순
            </span>
          </div>
        </section>

        {/* 왼쪽 필터 + 오른쪽 리스트 */}
        <section className="mt-6 flex items-start gap-10">
          <SearchSidebar setFilters={setFilters} />

          {/* 오른쪽 패키지 카드 리스트 */}
          <section className="flex flex-1 flex-col gap-5">
            {/* 조회 결과가 없는 경우 */}
            {products.length === 0 ? (
              <div className="p-20 text-center text-gray-500">조회 결과가 없습니다.</div>
            ) : (
              products.map((p: TravelPackage) => (
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
                    {/* 상단: 태그 + 제목 + 경로 + 평점 */}
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="mb-2 inline-block rounded-sm bg-[#e2ebff] px-2 py-1 text-[11px] font-semibold text-[#304f9e]">
                          해외패키지
                        </span>
                        <h3 className="text-[18px] font-semibold">{p.name}</h3>
                        <p className="mt-1 text-[13px] text-gray-500">인천 ▸ {p.region}</p>
                      </div>

                      {/* 평점 우측 상단 */}
                      <div className="flex items-center text-sm">
                        <span className="mr-1 text-base text-red-500">★</span>
                        <span className="mr-1">{getStableRating(p.id)}</span>
                        <span className="text-gray-400">/ 5</span>
                      </div>
                    </div>

                    {/* 하단: 가격 */}
                    <p className="pb-2 text-[19px] font-bold text-[#d32f2f]">
                      {p.price.toLocaleString('ko-KR')}원~
                    </p>
                  </div>
                </article>
              ))
            )}
          </section>
        </section>
      </main>
    </div>
  )
}
