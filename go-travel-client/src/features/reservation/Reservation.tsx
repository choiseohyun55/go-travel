'use client'

import { useNavigate, useSearchParams } from 'react-router'

import { useFlightDetail } from '@/hooks/useFlights'
import { useProductDetail } from '@/hooks/useProduct'
import { useCreateReservation } from '@/hooks/useReservation'
import formatDateTime from '@/utils/formatDateTime'
import { toast } from 'sonner'

export default function Reservation() {
  const navigate = useNavigate()

  const [params] = useSearchParams()
  const productId = Number(params.get('productId'))
  const flightId = Number(params.get('flightId'))
  const participants = Number(params.get('participants')) || 1

  // 데이터 불러오기
  const {
    data: product,
    isPending: productLoading,
    isError: productError,
  } = useProductDetail(productId)
  const { data: flight, isPending: flightLoading, isError: flightError } = useFlightDetail(flightId)
  const createReservation = useCreateReservation()

  if (productLoading || flightLoading) return <div className="p-10 text-center">로딩 중...</div>
  if (productError || flightError || !product || !flight)
    return <div className="p-10 text-center">예약 정보를 불러올 수 없습니다.</div>

  // 예약 요청
  const handleSubmit = () => {
    createReservation.mutate(
      { productId, flightId, participants },
      {
        onSuccess: () => {
          navigate(`/mypage/resHis`)
        },
        onError: () => {
          toast.error('예약 처리 중 문제가 발생했습니다.')
        },
      }
    )
  }

  const totalPrice = (product.price + flight.price) * participants // 총 금액
  const periodText = `${product.days}박 ${product.days + 1}일` // 여행 날짜

  return (
    <div className="min-h-scree py-10">
      <div className="mx-auto max-w-6xl px-10 pb-12">
        {/* 제목 */}
        <h2 className="mb-6 text-2xl font-bold">예약하기</h2>

        {/* 안내문 */}
        <div className="mb-8 space-y-1 rounded-md border border-gray-200 bg-[#fafafa] px-6 py-4 text-[13px] leading-relaxed text-gray-700">
          <p>
            홈페이지를 통한 예약은 확정이 아닌 접수 상태이며, 담당자 확인 후 최종 요금 및 예약
            확정이 진행됩니다.
          </p>
          <p>
            예약금은 담당자 안내 후 결제하셔야 하며, 지정 시간 내 미입금 시 예약이 임의 취소될 수
            있습니다.
          </p>
          <p>
            항공권 또는 항공권이 포함된 상품의 경우, 유류할증료 포함 금액이며 유가 및 환율 변동 시
            변경될 수 있습니다.
          </p>
          <p>아동/유아 기준은 항공사마다 상이하므로 예약 후 최종 확정됩니다.</p>
        </div>

        {/* 메인 레이아웃 */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* 왼쪽: 상품/예약자 정보 */}
          <div className="flex-1">
            {/* 상품 정보 */}
            <section className="mb-10">
              <h3 className="mb-3 text-lg font-semibold">상품 정보</h3>

              <table className="w-full border-t border-[#333333] text-left text-[13px]">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <th className="w-28 bg-[#fafafa] px-4 py-3 text-left font-medium">상품명</th>
                    <td className="px-4 py-3" colSpan={3}>
                      {product.name}
                    </td>
                  </tr>

                  <tr className="border-b border-gray-200">
                    <th className="bg-[#fafafa] px-4 py-3 text-left font-medium">예약유형</th>
                    <td className="px-4 py-3">패키지 상품</td>
                    <th className="w-28 px-4 py-3 text-left font-medium">예약금</th>
                    <td className="px-4 py-3">{totalPrice.toLocaleString('ko-KR')}원</td>
                  </tr>

                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 font-medium">이용 교통</th>
                    <td className="px-4 py-3">{flight.airline} 항공</td>
                    <th className="px-4 py-3 font-medium">여행 기간</th>
                    <td className="px-4 py-3">{periodText}</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* 예약자 정보 */}
            <section>
              <h3 className="mb-3 text-lg font-semibold text-[#111111]">예약자 정보</h3>

              <form id="reservationForm" onSubmit={handleSubmit}>
                <table className="w-full border-t border-[#333333] text-[13px]">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <th className="w-28 bg-[#fafafa] px-4 py-3 text-left font-medium">
                        <span className="mr-1 text-red-500">*</span> 이름
                      </th>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="이름을 입력하세요"
                          className="w-full border border-gray-300 px-3 py-2 text-[13px] outline-none focus:border-black"
                        />
                      </td>
                      <th className="w-28 bg-[#fafafa] px-4 py-3 text-left font-medium">
                        <span className="mr-1 text-red-500">*</span> 생년월일
                      </th>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          name="birth"
                          required
                          placeholder="YYYY.MM.DD"
                          className="w-full border border-gray-300 px-3 py-2 text-[13px] outline-none focus:border-black"
                        />
                      </td>
                    </tr>

                    <tr className="border-b border-gray-200">
                      <th className="bg-[#fafafa] px-4 py-3 text-left align-top font-medium">
                        <span className="mr-1 text-red-500">*</span> 성별
                      </th>
                      <td className="px-4 py-3" colSpan={3}>
                        <div className="flex items-center gap-6">
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="gender"
                              value="M"
                              className="h-4 w-4"
                              required
                            />
                            <span>남</span>
                          </label>
                          <label className="flex items-center gap-1">
                            <input type="radio" name="gender" value="F" className="h-4 w-4" />
                            <span>여</span>
                          </label>
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-200">
                      <th className="bg-[#fafafa] px-4 py-3 text-left font-medium">전화번호</th>
                      <td className="px-4 py-3" colSpan={3}>
                        <input
                          type="text"
                          name="phone"
                          required
                          placeholder="예) 01012345678"
                          className="w-full border border-gray-300 px-3 py-2 text-[13px] outline-none focus:border-black"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* 안내 문구 */}
                <ul className="mt-4 space-y-1 text-[12px] leading-relaxed text-gray-600">
                  <li>상품 예약 관련 이메일/SMS는 수신 동의 여부와 관계없이 자동 발송됩니다.</li>
                  <li>정확한 예약자 정보를 입력해 주세요.</li>
                  <li>외국 국적자의 경우 여행자 보험 가입을 위해 등록번호가 필요합니다.</li>
                </ul>
              </form>
            </section>
          </div>

          {/* 오른쪽: 사이드 요약 박스 */}
          <aside className="border-border mt-8 w-full shrink-0 rounded-sm border px-6 py-6 lg:sticky lg:top-24 lg:mt-0 lg:w-64">
            {/* 출발 / 도착 / 교통 */}
            <div className="mb-4 space-y-3 border-b border-gray-200 pb-4 text-[13px] text-gray-800">
              <div className="flex justify-between">
                <p className="text-[12px] text-gray-500">출발</p>
                <p className="font-medium">{formatDateTime(flight.deptTime)}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-[12px] text-gray-500">도착</p>
                <p className="font-medium">{formatDateTime(flight.arrivalTime)}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-[12px] text-gray-500">교통</p>
                <p className="font-medium">{flight.airline} 항공</p>
              </div>
            </div>

            {/* 인원수 */}
            <div className="mb-4 border-b border-gray-200 pb-4 text-[13px] text-gray-800">
              <div className="flex justify-between">
                <p className="text-[12px] text-gray-500">인원수</p>
                <p className="font-medium">{participants} 명</p>
              </div>
            </div>

            {/* 금액 */}
            <div className="mb-5 text-right">
              <p className="text-2xl font-bold text-[#e11d48]">
                {totalPrice.toLocaleString('ko-KR')}
                <span className="ml-1 text-base font-semibold text-[#111111]">원</span>
              </p>
            </div>

            {/* 예약하기 버튼 */}
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-primary w-full rounded-sm py-3 text-sm font-semibold hover:bg-yellow-500"
            >
              예약하기
            </button>
          </aside>
        </div>
      </div>
    </div>
  )
}
