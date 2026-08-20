import { RiKakaoTalkFill } from 'react-icons/ri'
import { SiApple, SiNaver } from 'react-icons/si'
import { useNavigate } from 'react-router'

import { Logo } from '@/components/common/Logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function Signup() {
  const navigate = useNavigate()

  return (
    <>
      {/* 로고 */}
      <Logo subtitle="쉽고 빠르게 회원이 되어보세요!" />

      {/* 혜택 아이콘 */}
      <Card className="bg-card mb-6 border-gray-200 shadow-none">
        <CardContent className="flex justify-between px-6 py-3">
          {[
            { title: '여행가자 포인트\n적립 · 사용', img: 'src/assets/images/signup/1.png' },
            { title: '다양한 할인 혜택\n쿠폰 제공', img: 'src/assets/images/signup/2.png' },
            { title: '특가 · 이벤트\n정보알림 서비스', img: 'src/assets/images/signup/3.png' },
          ].map((b, i) => (
            <div
              key={i}
              className={`flex flex-1 flex-col items-center justify-center gap-3 px-4 text-center ${
                i !== 2 ? 'border-border border-r' : ''
              }`}
            >
              <img src={b.img} alt={b.title} className="h-12 w-auto" />
              <h3 className="text-sub leading-snug whitespace-pre-line">{b.title}</h3>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 이메일 가입 */}
      <Button
        className="bg-primary text-primary-foreground w-full rounded-md py-7 text-lg font-semibold transition-colors hover:opacity-90"
        onClick={() => navigate('/signup/form')}
      >
        이메일로 회원가입
      </Button>

      {/* 구분선 */}
      <div className="my-6 flex items-center text-center">
        <div className="border-border flex-1 border-b" />
        <span className="text-sub px-3 text-base">또는</span>
        <div className="border-border flex-1 border-b" />
      </div>

      {/* 소셜 버튼 */}
      <div className="space-y-4">
        <Button className="w-full rounded-md bg-(--brand-kakao) py-6 text-lg text-[#3b1e1e] transition-colors hover:bg-[#FDD835]">
          <RiKakaoTalkFill size={22} />
          카카오로 시작하기
        </Button>
        <Button className="w-full rounded-md bg-(--brand-naver) py-6 text-lg text-white transition-colors hover:bg-[#24A000]">
          <SiNaver size={22} />
          네이버로 시작하기
        </Button>
        <Button className="w-full rounded-md bg-(--brand-apple) py-6 text-lg text-white transition-colors hover:bg-[#222]">
          <SiApple size={22} />
          애플로 시작하기
        </Button>
      </div>

      {/* 푸터 */}
      <footer className="text-muted mt-12 text-center text-sm">
        © Let's go tour. All Rights Reserved.
      </footer>
    </>
  )
}
