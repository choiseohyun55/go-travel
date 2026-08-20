import { useEffect } from 'react'
import { Link } from 'react-router'

import { Button } from '@/components/ui/button'
import confetti from 'canvas-confetti'

export default function SignupSuccess() {
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 360,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      origin: { x: 0.5, y: 0.5 },
    })
  }, [])

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="mb-4 text-3xl font-bold">회원가입이 완료되었습니다 🎉</h1>
      <p className="text-muted-foreground mb-8">이제 로그인 후 서비스를 이용하실 수 있습니다.</p>
      <Button asChild size="lg" className="h-12 px-8 text-lg">
        <Link to="/login">로그인하러 가기</Link>
      </Button>
    </div>
  )
}
