import { Route, Routes } from 'react-router'

import AuthLayout from '@/components/layouts/AuthLayout'
import MainLayout from '@/components/layouts/MainLayout'
import Home from '@/features/Home'
import NotFound from '@/features/NotFound'
import PackageDetail from '@/features/PackageDetail'
import Login from '@/features/auth/Login'
import { ProtectedRoute } from '@/features/auth/ProtectedRoute'
import Signup from '@/features/auth/Signup'
import SignupForm from '@/features/auth/SignupForm'
import SignupSuccess from '@/features/auth/SignupSuccess'
import MyPage from '@/features/mypage/MyPage'
import Recent from '@/features/mypage/Recent'
import ReservationNumberPage from '@/features/mypage/ReservationNumberSearchPage'
import WishList from '@/features/mypage/WishList'
import Reservation from '@/features/reservation/Reservation'
import ReservationHistoryPage from '@/features/reservation/ReservationHistoryPage'
import SearchResult from '@/features/search/SearchResult'
import { Toaster } from 'sonner'

import InfoUser from './features/mypage/InfoUser'
import PasswordChangePage from './features/mypage/PasswordChangePage'
import PasswordVerifyPage from './features/mypage/PasswordVerifyPage'

function App() {
  return (
    <>
      {/* 알림 */}
      <Toaster richColors position="top-center" />

      <Routes>
        {/* 기본 레이아웃 */}
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<SearchResult />} />
          <Route path="products/:id" element={<PackageDetail />} />

          {/* 아래부터 로그인 필요 */}
          <Route element={<ProtectedRoute />}>
            <Route path="mypage" element={<MyPage />} />
            <Route path="mypage/reservation" element={<Reservation />} />
            <Route path="mypage/resHis" element={<ReservationHistoryPage />} />
            <Route path="mypage/resNum" element={<ReservationNumberPage />} />
            <Route path="mypage/wishlist" element={<WishList />} />
            <Route path="mypage/recent" element={<Recent />} />
            <Route path="mypage/pwverify" element={<PasswordVerifyPage />} />
            <Route path="mypage/changepw" element={<PasswordChangePage />} />
            <Route path="mypage/infochange" element={<InfoUser />} />

            <Route path="reservations" element={<Reservation />} />
          </Route>
        </Route>

        {/* 회원가입/로그인 레이아웃 */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signup/form" element={<SignupForm />} />
          <Route path="signup/success" element={<SignupSuccess />} />
        </Route>

        {/* 그 외는 404 페이지로 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
