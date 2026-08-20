import { useEffect, useState } from 'react'
import { FaRegHeart, FaRegUser } from 'react-icons/fa'
import { IoMdTime } from 'react-icons/io'
import { Link, useNavigate } from 'react-router'

import { Logo } from '@/components/common/Logo'
import { ModeToggle } from '@/components/theme/mode-toggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useAuthStore } from '@/stores/useAuthStore'
import { Search } from 'lucide-react'

export default function TopBar() {
  const [keyword, setSearch] = useState('')
  const navigate = useNavigate()

  // Zustand에서 auth 상태와 액션 가져오기
  const { isLoggedIn, name, hydrateFromToken, logout } = useAuthStore()

  // 컴포넌트 마운트 시 localStorage의 토큰으로 상태 초기화
  useEffect(() => {
    hydrateFromToken()
  }, [hydrateFromToken])

  const handleSearch = () => {
    if (!keyword.trim()) return
    navigate(`/products?keyword=${encodeURIComponent(keyword)}`)
  }

  // 로그아웃
  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <div className="flex flex-col">
      {/* 로그인 / 회원가입 / 예약확인 */}
      <div className="text-muted-foreground bg-background flex items-center justify-end gap-4 py-2 text-sm">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="hover:text-accent transition">
              로그인
            </Link>
            <Link to="/signup" className="hover:text-accent transition">
              회원가입
            </Link>
          </>
        ) : (
          <>
            <span className="font-semibold">{name} 님</span>
            <button onClick={handleLogout} className="hover:text-accent transition">
              로그아웃
            </button>
          </>
        )}
        <Link to="/mypage/resHis" className="hover:text-accent transition">
          예약확인/결제
        </Link>
      </div>

      {/* 로고 + 검색 + 유저메뉴 */}
      <div className="flex items-center justify-between py-5">
        {/* 로고 */}
        <Logo direction="row" />

        {/* 검색 */}
        <div className="relative mx-12 w-[600px] shrink-0">
          <Input
            id="searchInput"
            placeholder="30만원대로 떠나는 가성비 보라카이!"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="border-primary h-11 rounded-full pr-20 pl-10 text-sm focus-visible:ring-2"
          />
          <Search className="text-muted-foreground absolute top-3 left-3.5 h-5 w-5" />
          <Button
            type="button"
            onClick={handleSearch}
            className="bg-primary absolute top-1 right-1 rounded-full px-6 font-medium text-black hover:bg-yellow-500"
          >
            검색
          </Button>
        </div>

        {/* 유저 메뉴 */}
        <TooltipProvider>
          <div className="flex items-center gap-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/mypage" className="flex flex-col items-center">
                  <FaRegUser className="text-muted-foreground" size={20} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>마이페이지</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/mypage/recent" className="flex flex-col items-center">
                  <IoMdTime className="text-muted-foreground" size={25} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>최근 본 내역</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="mypage/wishlist" className="flex flex-col items-center">
                  <FaRegHeart className="text-muted-foreground" size={20} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>찜 한 내역</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>

        <ModeToggle />
      </div>
    </div>
  )
}
