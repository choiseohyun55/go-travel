'use client'

import { useNavigate } from 'react-router'

import { Button } from '@/components/ui/button'
import { Ghost } from 'lucide-react'
import { motion } from 'motion/react'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center text-center">
      {/* 아이콘 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-muted mb-6 flex h-24 w-24 items-center justify-center rounded-full"
      >
        <Ghost className="text-muted-foreground h-12 w-12" />
      </motion.div>

      {/* 텍스트 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <h1 className="text-foreground text-5xl font-bold tracking-tight">404</h1>
        <p className="text-muted-foreground mt-2 text-lg">페이지를 찾을 수 없습니다.</p>
        <p className="text-muted-foreground mt-1 text-sm">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
      </motion.div>

      {/* 버튼 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="mt-8"
      >
        <Button
          onClick={() => navigate('/')}
          className="rounded-lg px-6 py-5 text-base font-medium shadow-sm hover:opacity-90"
        >
          홈으로 돌아가기
        </Button>
      </motion.div>
    </div>
  )
}
