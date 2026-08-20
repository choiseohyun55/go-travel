import { fetchProducts, fetchProductsByLocationId, getProductDetail } from '@/api/productApi'
import type { Package, TravelPackage } from '@/types/product'
import { getStableRating } from '@/utils/rate'
import { useQuery } from '@tanstack/react-query'

interface Filters {
  days?: number[]
  price?: number[]
}

export type SortOption = 'default' | 'rating' | 'priceAsc' | 'priceDesc'

// *Home page*
// best packages 조회
export function useBestPackages(limit = 4) {
  return useQuery({
    queryKey: ['best-packages', limit],
    queryFn: async () => {
      const allProducts = await fetchProducts('')

      // 기존 로직 유지: 평점 높은 순 정렬 후 N개 가져오기
      const best = allProducts
        .sort((a, b) => parseFloat(getStableRating(b.id)) - parseFloat(getStableRating(a.id)))
        .slice(0, limit)

      // UI에 필요한 데이터
      return best.map((p, idx) => ({
        ...p, // 원본 데이터 유지 (id, name, region 등)
        labelImg: `/images/label/label${idx + 1}.png`,
        packageName: p.name,
        departure: p.region,
        destination: p.city,
        badges: ['인기', '추천'],
        badgeCls: ['badge-start', 'badge-recommend'],

        // 필요하면 더 추가 가능
      }))
    },
  })
}

// 근거리(shortTrips) 조회
export function useShortTrips() {
  return useQuery({
    queryKey: ['short-trips'],
    queryFn: async () => {
      const allProducts = await fetchProducts('')

      // 일정이 1~3일인 상품만 필터링
      const shortTrips = allProducts.filter((p) => p.days <= 3)

      // UI 구조에 맞게 변환
      return shortTrips.map((p) => ({
        ...p,
        packageName: p.name,
        departure: p.region,
        destination: p.city,
        imageUrl: p.imageUrl,
      }))
    },
  })
}

// 인기 급상승 (가격 기준 상위 N개)
export function useTopPricePackages(limit = 4) {
  return useQuery({
    queryKey: ['top-price-packages', limit],
    queryFn: async () => {
      const allProducts = await fetchProducts('')

      // price 기준 내림차순 정렬 후 limit개 추출
      const topPricePackages = allProducts.sort((a, b) => b.price - a.price).slice(0, limit)

      // UI 구조에 맞게 변환
      return topPricePackages.map((p) => ({
        ...p,
        packageName: p.name,
        imageUrl: p.imageUrl,
        id: p.id,
      }))
    },
  })
}

//*검색 결과 페이지 */

// 필터 적용 가능
export function useFilteredProductsByLocationId(
  locationId: number,
  filters: Filters,
  sortOption: SortOption = 'default'
) {
  return useQuery<TravelPackage[]>({
    queryKey: ['filtered-products-location', locationId, filters, sortOption],
    queryFn: async () => {
      const allProducts = await fetchProductsByLocationId(locationId)

      const filtered = allProducts.filter((product) => {
        // 1. days 필터 적용 (범위 체크)
        const isDaysMatch =
          !filters.days ||
          filters.days.length === 0 ||
          filters.days.some((filterDay) => {
            if (filterDay === 3) {
              return product.days >= 2 && product.days <= 3
            } else if (filterDay === 5) {
              return product.days >= 4 && product.days <= 5
            } else if (filterDay === 6) {
              return product.days >= 6
            }
            return false
          })

        // 2. price 필터 적용 (가격 범위 체크 수정)
        const isPriceMatch =
          !filters.price ||
          filters.price.length === 0 ||
          filters.price.some((filterPrice) => {
            if (filterPrice === 100) {
              return product.price <= 1000000 // 100만원 이하 (100만원을 1,000,000원으로 비교)
            } else if (filterPrice === 200) {
              return product.price > 1000000 && product.price <= 2000000 // 100~200만원
            } else if (filterPrice === 300) {
              return product.price > 2000000 // 200만원 이상
            }
            return false
          })

        return isDaysMatch && isPriceMatch
      })
      // 2. 정렬 적용
      if (sortOption === 'rating') {
        filtered.sort(
          (a, b) => parseFloat(getStableRating(b.id)) - parseFloat(getStableRating(a.id))
        )
      } else if (sortOption === 'priceAsc') {
        filtered.sort((a, b) => a.price - b.price)
      } else if (sortOption === 'priceDesc') {
        filtered.sort((a, b) => b.price - a.price)
      }

      return filtered
    },
    enabled: !!locationId,
  })
}

// keyword와 필터를 기반으로 필터링된 상품을 반환하는 훅
export function useFilteredProductsByKeyword(
  keyword: string,
  filters: Filters,
  sortOption: SortOption = 'default'
) {
  return useQuery<TravelPackage[]>({
    queryKey: ['filtered-products-keyword', keyword, filters, sortOption],
    queryFn: async () => {
      const allProducts = await fetchProducts(keyword)

      const filtered = allProducts.filter((product) => {
        // 1. days 필터 적용
        const isDaysMatch =
          !filters.days ||
          filters.days.length === 0 ||
          filters.days.some((filterDay) => {
            if (filterDay === 3) {
              return product.days >= 2 && product.days <= 3
            } else if (filterDay === 5) {
              return product.days >= 4 && product.days <= 5
            } else if (filterDay === 6) {
              return product.days >= 6
            }
            return false
          })

        // 2. price 필터 적용
        const isPriceMatch =
          !filters.price ||
          filters.price.length === 0 ||
          filters.price.some((filterPrice) => {
            if (filterPrice === 100) {
              return product.price <= 1000000 // 100만원 이하 (100만원을 1,000,000원으로 비교)
            } else if (filterPrice === 200) {
              return product.price > 1000000 && product.price <= 2000000 // 100~200만원
            } else if (filterPrice === 300) {
              return product.price > 2000000 // 200만원 이상
            }
            return false
          })

        return isDaysMatch && isPriceMatch
      })
      // 3. 정렬 적용
      if (sortOption === 'rating') {
        filtered.sort(
          (a, b) => parseFloat(getStableRating(b.id)) - parseFloat(getStableRating(a.id))
        )
      } else if (sortOption === 'priceAsc') {
        filtered.sort((a, b) => a.price - b.price)
      } else if (sortOption === 'priceDesc') {
        filtered.sort((a, b) => b.price - a.price)
      }

      return filtered
    },
    enabled: !!keyword, // keyword가 없으면 쿼리 실행되지 않도록
  })
}

// 검색창은 keyword 기반 검색
export function useProducts(keyword: string) {
  return useQuery<TravelPackage[]>({
    queryKey: ['products', keyword],
    queryFn: () => fetchProducts(keyword),
    enabled: !!keyword,
  })
}

// 네비게이션은 location id 기반으로 검색
export function useProductsByLocationId(locationId: number) {
  return useQuery<TravelPackage[]>({
    queryKey: ['products-location', locationId],
    queryFn: () => fetchProductsByLocationId(locationId),
    enabled: !!locationId,
  })
}

// 상품 id 기반으로 상세 정보 조회
export function useProductDetail(id: number) {
  return useQuery<Package>({
    queryKey: ['product-detail', id],
    queryFn: () => getProductDetail(id),
    enabled: !!id,
  })
}
