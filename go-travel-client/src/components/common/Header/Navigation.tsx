'use client'

import { Link } from 'react-router'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { NAV_DATA } from '@/types/navData'

export default function Navigation() {
  return (
    <NavigationMenu viewport={false} className="relative z-[50] pt-3 pb-1.5">
      <NavigationMenuList className="justify-start">
        {Object.entries(NAV_DATA).map(([key, region]) => {
          const itemCount = region.items.length

          let columns = 1
          let gridClassName = 'w-[320px] grid-cols-1'
          if (itemCount >= 17) {
            columns = 3
            gridClassName = 'w-[900px] grid-cols-3'
          } else if (itemCount >= 9) {
            columns = 2
            gridClassName = 'w-[600px] grid-cols-2'
          }

          // 아이템을 열 개수에 맞게 분할
          const itemsPerColumn = Math.ceil(itemCount / columns)
          const columnItems: { id: number; name: string }[][] = []

          for (let i = 0; i < columns; i++) {
            const start = i * itemsPerColumn
            const end = start + itemsPerColumn
            columnItems.push(region.items.slice(start, end))
          }

          return (
            <NavigationMenuItem key={key}>
              <NavigationMenuTrigger className="group text-muted-foreground flex text-base [&>svg]:hidden">
                {region.title}
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <div className={cn('grid gap-6 p-6', gridClassName)}>
                  {columnItems.map((items, colIndex) => (
                    <div key={colIndex} className="space-y-2">
                      {/* 첫 번째 열에만 제목 표시 */}
                      {colIndex === 0 ? (
                        <h4 className="font-semibold">
                          <span className="text-orange-400">지역 </span>
                          {region.title}
                        </h4>
                      ) : (
                        <h4 className="aria-hidden font-semibold opacity-0">
                          <span className="text-orange-400">&nbsp;</span>
                        </h4>
                      )}

                      <ul className="flex flex-col space-y-1">
                        {items.map((city) => (
                          <li key={city.id}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={`/products?locationId=${city.id}`}
                                className="text-muted-foreground hover:text-foreground hover:underline"
                              >
                                {city.name}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
