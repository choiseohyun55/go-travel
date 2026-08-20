import { api } from '@/lib/axios'
import type { FlightResponse } from '@/types/flights'

// 월 단위 조회
export const getFlightsByMonth = async (year: number, month: number) => {
  const res = await api.get<FlightResponse[]>('/flights', {
    params: { year, month },
  })
  return res.data
}

export const getFlightDetail = async (flightId: number) => {
  const res = await api.get(`/flights/${flightId}`)
  return res.data
}
