import { use, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'

type Item = {
  label: string
  path: string
}

type Props = {
  title: string
  items?: Item[]
  defaultOpen?: boolean
}

export default function SidebarSection({ title, items = [], defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen)
  const location = useLocation() // 브라우저가 어떤 경로에 있는지
  // 경로가 변경될 때마다 드롭다운 열기/닫기
  useEffect(() => {
    // 현재 경로에 해당하는 항목이 있으면 드롭다운을 열고, 없으면 닫기
    const isOpen = items.some((item) => item.path === location.pathname)
    setOpen(isOpen) // 경로에 해당하는 항목이 있으면 열고, 없으면 닫는다
  }, [location, items]) // location이나 items가 변경될 때마다 effect 실행

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

      {/* 열림/닫힘 영역 드롭다운*/}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? 'mt-2 max-h-56' : 'max-h-0'
        }`}
      >
        {items.length > 0 && (
          <div className="mt-1 space-y-1.5 pl-1 text-sm">
            {items.map((item) => {
              const isActive = location.pathname === item.path

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block w-full rounded px-2 py-1 transition ${
                    isActive ? 'text-foreground font-semibold' : 'text-muted-foreground'
                  } `}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
