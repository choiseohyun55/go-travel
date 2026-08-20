import { Link } from 'react-router'

import { cn } from '@/lib/utils'
import { motion } from 'motion/react'

interface LogoProps {
  subtitle?: string
  className?: string
  direction?: 'row' | 'col'
}

export function Logo({ subtitle, className = '', direction = 'col' }: LogoProps) {
  const isRow = direction === 'row'

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Link
        to="/"
        className={cn('flex', isRow ? 'flex-row items-center' : 'flex-col items-center', className)}
      >
        <img
          src="/logo_2.png"
          alt="여행가자 로고"
          className={isRow ? 'mr-2 h-9 w-9' : 'mb-4 h-auto w-20'}
        />
        <div
          className={`${isRow ? 'flex flex-col justify-center leading-none' : 'text-center leading-snug'}`}
        >
          <h1
            className={`font-['YeogiOttaeJalnan'] font-bold tracking-tight ${
              isRow ? 'text-2xl' : 'mb-2 text-4xl'
            }`}
          >
            여행가자
          </h1>
          {subtitle && (
            <p className={`${isRow ? 'text-sub mt-0.5 text-lg' : 'text-sub mb-8 text-lg'}`}>
              {subtitle}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
