'use client'

import { useState } from 'react'

import SidebarSection from '@/components/common/Sidebar/SearchSidebarSection'
import type { CheckboxItem } from '@/components/common/Sidebar/SearchSidebarSection'

interface Props {
  setFilters: (filters: { days: number[]; price: number[] }) => void
}

export default function SearchSidebar({ setFilters }: Props) {
  const [selectedDays, setSelectedDays] = useState<number[]>([])
  const [selectedPrice, setSelectedPrice] = useState<number[]>([])

  const daysItems: CheckboxItem[] = [
    { label: '2~3일', value: 3 }, // 값이 숫자로 바뀌었어
    { label: '4~5일', value: 5 },
    { label: '6일 이상', value: 6 },
  ]

  const priceItems: CheckboxItem[] = [
    { label: '100만원 이하', value: 100 },
    { label: '100~200만원', value: 200 },
    { label: '200만원 이상', value: 300 },
  ]

  const handleApplyFilters = () => {
    setFilters({
      days: selectedDays,
      price: selectedPrice,
    })
  }

  // toggleValue 함수에서 value를 number로 받고 list도 number[]로 수정
  const toggleValue = (value: number, list: number[], setList: (v: number[]) => void) => {
    if (list.includes(value)) setList(list.filter((v) => v !== value))
    else setList([...list, value])
  }

  return (
    <aside className="border-border w-[280px] shrink-0 rounded-2xl border px-7 py-6">
      <h3 className="mb-4 text-base font-semibold">필터</h3>
      <div className="border-primary mb-3 border-t" />

      <SidebarSection
        title="여행기간"
        items={daysItems}
        selectedValues={selectedDays}
        // onChange에서 이제 숫자로 바로 처리
        onChange={(value) => toggleValue(value, selectedDays, setSelectedDays)}
      />

      <SidebarSection
        title="상품가격"
        items={priceItems}
        selectedValues={selectedPrice}
        onChange={(value) => toggleValue(value, selectedPrice, setSelectedPrice)}
      />

      <button
        type="button"
        className="bg-primary text-primary-foreground mt-6 h-11 w-full rounded-md text-sm font-semibold hover:opacity-90"
        onClick={handleApplyFilters}
      >
        적용
      </button>
    </aside>
  )
}
