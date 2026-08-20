'use client'

import React from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useReservationDetail } from '@/hooks/useReservation'
import formatDateTime from '@/utils/formatDateTime'

interface Props {
  reservationId: number | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}

export default function ReservationDetailModal({ reservationId, open, onOpenChange }: Props) {
  const { data, isPending } = useReservationDetail(reservationId ?? 0)

  if (!reservationId) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">예약 상세 정보</DialogTitle>
          <DialogDescription>선택하신 예약의 상세 내역입니다.</DialogDescription>
        </DialogHeader>

        {isPending && <div className="py-10 text-center text-gray-500">불러오는 중...</div>}

        {!isPending && !data && <div className="py-10 text-center text-gray-500">데이터 없음</div>}

        {!isPending && data && (
          <div className="space-y-6">
            {/* 상세 내용 */}
            <section className="space-y-4 rounded-md border p-5">
              <DetailRow
                label="상품명"
                value={<span className="text-lg font-semibold">{data.productName}</span>}
              />
              <DetailRow label="예약번호" value={data.id} />
              <DetailRow label="예약일시" value={formatDateTime(data.orderAt)} />
              <DetailRow label="예약자" value={data.userName} />
              <DetailRow label="출발일" value={data.deptDate.replace(/-/g, '.')} />
              <DetailRow label="여행 기간" value={data.period} />
              <DetailRow label="항공사" value={data.airline} />
              <DetailRow label="인원" value={`${data.participants}명`} />

              <DetailRow
                label="총 금액"
                value={
                  <span className="text-lg font-semibold text-red-600">
                    {data.price.toLocaleString()}원
                  </span>
                }
              />

              <DetailRow
                label="진행상황"
                value={
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${data.status === 'PENDING' && 'bg-yellow-200 text-yellow-800'} ${data.status === 'CONFIRMED' && 'bg-green-200 text-green-800'} ${data.status === 'CANCELLED' && 'bg-gray-300 text-gray-700'} `}
                  >
                    {data.status}
                  </span>
                }
              />
            </section>
          </div>
        )}

        <DialogFooter className="mt-2">
          <button
            className="rounded-md border px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => onOpenChange(false)}
          >
            닫기
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
