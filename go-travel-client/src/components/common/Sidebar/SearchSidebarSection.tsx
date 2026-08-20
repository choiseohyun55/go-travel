import { useState } from 'react'

export interface CheckboxItem {
  label: string
  value: number // value를 number로 변경
}

interface Props {
  title: string
  items?: CheckboxItem[]
  selectedValues: number[] // selectedValues 타입을 number[]로 변경
  onChange: (value: number) => void // onChange의 value도 number로 수정
  defaultOpen?: boolean
}

export default function SidebarSection({
  title,
  items = [],
  selectedValues,
  onChange,
  defaultOpen = false,
}: Props) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section className="mb-5">
      {/* 헤더 버튼 */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="text-foreground/90 hover:text-foreground flex w-full items-center justify-between text-[15px] font-semibold transition"
      >
        <span>{title}</span>
        <span
          className={`text-muted-foreground text-xs transition-transform duration-200 ${
            open ? 'rotate-180' : 'rotate-0'
          }`}
        >
          ▾
        </span>
      </button>

      {/* 열림/닫힘 영역 */}
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'mt-2 max-h-56' : 'max-h-0'}`}
      >
        {items.length > 0 && (
          <div className="mt-1 space-y-1.5 pl-1 text-sm">
            {items.map((item) => (
              <label key={item.value} className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedValues.includes(item.value)}
                  onChange={() => onChange(item.value)} // value도 number로 수정
                  className="accent-primary"
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
