import { Navigate, Outlet, useLocation } from 'react-router'

export function ProtectedRoute() {
  const location = useLocation()
  const token = localStorage.getItem('accessToken')

  // 로그인 안 된 경우 → 로그인 페이지로 보냄
  if (!token)
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />

  // 로그인 된 경우 → 원래 컴포넌트 렌더링
  return <Outlet />
}
