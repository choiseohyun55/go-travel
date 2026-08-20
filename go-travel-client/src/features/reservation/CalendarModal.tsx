'use client'

import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'

import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useFlightsByMonth } from '@/hooks/useFlights'
import useSoldMap from '@/hooks/useSoldmap'
import type { FlightResponse } from '@/types/flights'
import { toast } from 'sonner'

type Props = {
  showModal: boolean
  setShowModal: (v: boolean) => void
  productId: number
  participants: number
}

const AIRLINE_MAP: Record<string, string> = {
  'Asiana Airlines': '아시아나',
  'Korean Air': '대한항공',
}

export default function CalendarModal({ showModal, setShowModal, productId, participants }: Props) {
  const navigate = useNavigate()

  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [monthOffset, setMonthOffset] = useState(0)
  const [filterAirlines, setFilterAirlines] = useState(['아시아나', '대한항공', '국외항공'])

  // 기준 날짜
  const today = new Date()
  const displayDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1)
  const year = displayDate.getFullYear()
  const month = displayDate.getMonth() + 1

  // 데이터 fetch
  const { data: monthFlights = [], isPending } = useFlightsByMonth(year, month)
  const { data: soldMap = {} } = useSoldMap(monthFlights, year, month)

  // 날짜별 그룹
  const flightsByDay = useMemo(() => {
    const map: Record<string, FlightResponse[]> = {}
    monthFlights.forEach((f) => {
      map[f.deptDate] ??= []
      map[f.deptDate].push(f)
    })
    return map
  }, [monthFlights])

  // dot 색상
  const getDotColor = (dateStr: string) => {
    const flights = flightsByDay[dateStr]
    if (!flights) return null

    const flags = flights.map((f) => soldMap[f.id])
    if (flags.some((v) => v === false)) return 'green'
    if (flags.every((v) => v === true)) return 'red'
    return null
  }

  // 날짜 선택 시 해당 날짜의 schedule 목록
  const schedules = useMemo(() => {
    if (!selectedDate) return []

    return (flightsByDay[selectedDate] ?? []).map((f) => ({
      id: f.id,
      airline: AIRLINE_MAP[f.airline] ?? '국외항공',
      flightNo: f.flightNumber,
      date: f.deptDate,
      depart: f.deptTime.slice(11, 16),
      arrive: f.arrivalTime.slice(11, 16),
      price: Number(f.price),
      soldOut: soldMap[f.id],
    }))
  }, [selectedDate, flightsByDay, soldMap])

  // 필터 적용
  const filteredSchedules = schedules.filter((s) => filterAirlines.includes(s.airline))

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="max-h-[90vh] w-full overflow-y-auto sm:max-w-[1100px]">
        <DialogHeader>
          <DialogTitle>출발일 보기</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="grid grid-cols-[360px_1fr] gap-6">
          {/* 달력 */}
          <Calendar
            mode="single"
            month={new Date(year, month - 1)}
            formatters={{
              formatCaption: (date: Date) => {
                const y = date.getFullYear()
                const m = String(date.getMonth() + 1).padStart(2, '0')
                return `${y}년 ${m}월`
              },
              formatWeekdayName: (weekdayDate: Date) => {
                const weekday = weekdayDate.getDay()
                return ['일', '월', '화', '수', '목', '금', '토'][weekday]
              },
            }}
            showOutsideDays={false}
            selected={selectedDate ? new Date(selectedDate) : undefined}
            onSelect={(date) => {
              if (!date) return
              const y = date.getFullYear()
              const m = String(date.getMonth() + 1).padStart(2, '0')
              const d = String(date.getDate()).padStart(2, '0')
              setSelectedDate(`${y}-${m}-${d}`)
            }}
            onMonthChange={(d) => {
              const diff =
                d.getMonth() - today.getMonth() + (d.getFullYear() - today.getFullYear()) * 12
              setMonthOffset(diff)
              setSelectedDate(null)
            }}
            modifiers={{
              available: (date) => {
                const y = date.getFullYear()
                const m = String(date.getMonth() + 1).padStart(2, '0')
                const d = String(date.getDate()).padStart(2, '0')
                const dateStr = `${y}-${m}-${d}`
                return getDotColor(dateStr) === 'green'
              },
              soldout: (date) => {
                const y = date.getFullYear()
                const m = String(date.getMonth() + 1).padStart(2, '0')
                const d = String(date.getDate()).padStart(2, '0')
                const dateStr = `${y}-${m}-${d}`
                return getDotColor(dateStr) === 'red'
              },
            }}
            modifiersClassNames={{
              available: 'calendar-dot-available',
              soldout: 'calendar-dot-soldout',
            }}
            className="h-[430px]"
            classNames={{
              caption_label: 'text-lg font-semibold',
              day: 'relative h-12 w-12 mx-auto flex items-center justify-center text-base rounded-full transition-all hover:bg-gray-100 active:scale-[0.97]',
            }}
          />

          {/* 오른쪽: 리스트 */}
          <div className="max-h-[430px] overflow-y-auto rounded-lg border p-4">
            {isPending && <div>불러오는 중…</div>}

            {!isPending && !selectedDate && (
              <div className="flex flex-1 items-center justify-center py-16 text-sm text-gray-400">
                날짜를 선택해주세요.
              </div>
            )}

            {!isPending && selectedDate && (
              <>
                {/* 필터 */}
                <div className="mb-3 flex flex-wrap gap-2">
                  {['아시아나', '대한항공', '국외항공'].map((air) => (
                    <button
                      key={air}
                      className={`rounded-full border px-2 py-1 ${
                        filterAirlines.includes(air)
                          ? 'bg-primary border-primary text-white'
                          : 'border-yellow-100 bg-yellow-100 text-yellow-600'
                      }`}
                      onClick={() =>
                        filterAirlines.includes(air)
                          ? setFilterAirlines(filterAirlines.filter((f) => f !== air))
                          : setFilterAirlines([...filterAirlines, air])
                      }
                    >
                      {air}
                    </button>
                  ))}
                </div>

                {/* 리스트 */}
                {filteredSchedules.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-sm text-gray-400">
                    예약가능한 항공편이 없습니다.
                  </div>
                ) : (
                  filteredSchedules.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => {
                        if (s.soldOut) return toast.error('예약마감된 상품입니다.')
                        setShowModal(false)
                        navigate(
                          `/reservations?productId=${productId}&flightId=${s.id}&participants=${participants}`
                        )
                      }}
                      className={`group relative mb-1 flex cursor-pointer items-center justify-between rounded-xl border p-4 transition hover:border-yellow-300 hover:shadow-md ${s.soldOut ? 'cursor-not-allowed opacity-60' : ''} `}
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-700">{s.airline}</span>
                          <span className="text-sm font-bold">{s.flightNo}</span>
                        </div>

                        {/* 시간 */}
                        <div className="text-sm font-medium text-gray-600">
                          {s.depart} <span className="mx-1">→</span> {s.arrive}
                        </div>

                        {/* 예약 상태 뱃지 */}
                        {s.soldOut ? (
                          <span className="mt-1 w-fit rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                            예약마감
                          </span>
                        ) : (
                          <span className="mt-1 w-fit rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-600">
                            예약가능
                          </span>
                        )}
                      </div>

                      {/* 오른쪽 가격 */}
                      <div className="flex flex-col items-end">
                        <div className="text-lg font-bold text-gray-900 transition group-hover:text-yellow-500">
                          {s.price.toLocaleString()}원~
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
