import { Outlet } from 'react-router'

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen min-w-[1200px] flex-col items-center justify-center px-8">
      <div className="w-full max-w-lg">
        <Outlet />
      </div>
    </div>
  )
}
