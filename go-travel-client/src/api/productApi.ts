import { api } from '@/lib/axios'
import type { Package, TravelPackage } from '@/types/product'

// 키워드 검색
export async function fetchProducts(keyword: string): Promise<TravelPackage[]> {
  const res = await api.get('/products', {
    params: { keyword },
  })
  return res.data
}

// 지역별 상품 조회
export async function fetchProductsByLocationId(locationId: number): Promise<TravelPackage[]> {
  const res = await api.get('/products', {
    params: { locationId },
  })
  return res.data
}

// 상품 상세 조회
export async function getProductDetail(id: number): Promise<Package> {
  const res = await api.get(`/products/${id}`)
  return res.data
}
