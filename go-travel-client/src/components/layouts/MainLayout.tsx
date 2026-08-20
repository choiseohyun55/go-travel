import { Outlet, useLocation } from 'react-router'

import Footer from '@/components/common/Footer'
import { Header } from '@/components/common/Header'

export default function MainLayout() {
  const location = useLocation()

  // Home 페이지인 경우에만 스타일을 다르게 처리
  const isHomePage = location.pathname === '/'

  return (
    <div className={`flex min-h-screen ${isHomePage ? 'w-full' : 'min-w-[1200px]'} flex-col`}>
      <Header />
      <main className="flex flex-1 justify-center">
        <div className={`${isHomePage ? 'w-full' : 'w-[1200px] px-6 py-8'}`}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

// 기존 코드
// import { Outlet } from 'react-router'

// import Footer from '@/components/common/Footer'
// import { Header } from '@/components/common/Header'

// export default function MainLayout() {
//   return (
//     <div className="flex min-h-screen min-w-[1200px] flex-col">
//       <Header />
//       <main className="flex flex-1 justify-center">
//         <div className="w-[1200px] px-6 py-8">
//           <Outlet />
//         </div>
//       </main>
//       <Footer />
//     </div>
//   )
// }
