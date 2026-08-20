import {
  type ReservationCreateDto,
  createReservation,
  getMyReservations,
  getReservationDetail,
} from '@/api/reservationApi'
import { useMutation, useQuery } from '@tanstack/react-query'

// 예약 생성
export function useCreateReservation() {
  return useMutation({
    mutationFn: (payload: ReservationCreateDto) => createReservation(payload),
  })
}

// 예약 목록 조회
export function useMyReservations() {
  return useQuery({
    queryKey: ['my-reservations'],
    queryFn: getMyReservations,
  })
}

// 예약 상세 정보 조회
export function useReservationDetail(id: number) {
  return useQuery({
    queryKey: ['reservation', id],
    queryFn: () => getReservationDetail(id),
    enabled: !!id,
  })
}
