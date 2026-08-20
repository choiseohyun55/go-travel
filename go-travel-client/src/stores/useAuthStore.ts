import { jwtDecode } from 'jwt-decode'
import { create } from 'zustand'

// JWT payload 타입
type JwtPayload = {
  username?: string
  name?: string
  email?: string
  sub?: string
  exp?: number
}

type AuthState = {
  isLoggedIn: boolean
  name: string
  email: string

  // 액션들
  hydrateFromToken: () => void
  login: (token: string) => void
  logout: () => void
}

// JWT payload 디코딩 (decode JWT payload)
function decodeJwtPayload(token: string | null): JwtPayload | null {
  if (!token || token === 'undefined' || token === 'null') return null

  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null

    // base64url → base64 변환 (base64url → base64)
    let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const pad = base64.length % 4
    if (pad) {
      base64 += '='.repeat(4 - pad)
    }

    const base64Decoded = atob(base64)
    const json = decodeURIComponent(
      base64Decoded
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(json)
  } catch (e) {
    console.error('JWT decode error:', e)
    return null
  }
}

// Zustand auth 스토어
export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  name: '',
  email: '',

  hydrateFromToken: () => {
    if (typeof window === 'undefined') return
    const token = localStorage.getItem('accessToken')

    if (!token) return set({ isLoggedIn: false, name: '', email: '' })

    try {
      const payload = jwtDecode<JwtPayload>(token)

      // 만료 체크
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('accessToken')
        return set({ isLoggedIn: false, name: '' })
      }
      const name = payload.username ?? payload.name ?? ''
      const email = payload.email ?? payload.sub ?? ''
      set({ isLoggedIn: true, name, email })
    } catch {
      localStorage.removeItem('accessToken')
      set({ isLoggedIn: false, name: '' })
    }
  },

  // 로그인 시 토큰 저장 + 상태 세팅
  login: (token) =>
    set(() => {
      localStorage.setItem('accessToken', token)
      const payload = jwtDecode<JwtPayload>(token)

      const name = payload.username ?? payload.name ?? ''
      const email = payload.email ?? payload.sub ?? ''

      return {
        isLoggedIn: true,
        name,
        email,
      }
    }),

  // 로그아웃
  logout: () =>
    set(() => {
      localStorage.removeItem('accessToken')
      return { isLoggedIn: false, name: '', email: '' }
    }),
}))
