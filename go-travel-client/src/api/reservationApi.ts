import { api } from '@/lib/axios'

export interface ReservationCreateDto {
  productId: number
  flightId: number
  participants: number
}

// 예약 생성
export const createReservation = async (data: ReservationCreateDto) => {
  const res = await api.post('/reservations', data)
  return res.data
}

// 내 예약 목록 조회
export const getMyReservations = async () => {
  const res = await api.get('/me/reservations')
  const payload = res.data

  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.content)) return payload.content

  return []
}

// 예약 상세 조회
export const getReservationDetail = async (reservationId: number) => {
  const res = await api.get(`/me/reservations/${reservationId}`)
  return res.data
}

// 예약 취소
export const cancelReservation = async (reservationId: number) => {
  const res = await api.delete(`/me/reservations/${reservationId}`)
  return res.data
}
