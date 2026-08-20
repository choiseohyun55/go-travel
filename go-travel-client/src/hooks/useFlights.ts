import { getFlightDetail, getFlightsByMonth } from '@/api/flightApi'
import type { FlightResponse } from '@/types/flights'
import { useQuery } from '@tanstack/react-query'

// 날짜 + location 기반 조회
export function useFlightsByMonth(year: number, month: number) {
  return useQuery<FlightResponse[]>({
    queryKey: ['flightsByMonth', year, month],
    queryFn: () => getFlightsByMonth(year, month),
  })
}

// 특정 비행기 조회
export function useFlightDetail(id: number) {
  return useQuery({
    queryKey: ['flight', id],
    queryFn: () => getFlightDetail(id),
    enabled: !!id,
  })
}
