'use client'

import { useSearchParams } from 'react-router'

import SearchByKeyword from '@/features/search/SearchByKeyword'
import SearchByLocation from '@/features/search/SearchByLocation'

export default function ProductsResult() {
  const [params] = useSearchParams()

  const keyword = params.get('keyword') ?? ''
  const locationId = Number(params.get('locationId') ?? 0)

  if (keyword) {
    return <SearchByKeyword keyword={keyword} />
  }

  if (locationId) {
    return <SearchByLocation locationId={locationId} />
  }

  // 둘 다 없는 경우 → 잘못된 접근
  return (
    <div className="flex h-[400px] items-center justify-center text-gray-500">
      😶 검색 조건이 없습니다.
    </div>
  )
}
