import SidebarSection from './SidebarSection'

const sidebarData = [
  {
    title: '예약 / 취소내역',
    defaultOpen: true,
    items: [
      { label: '예약/ 취소내역', path: '/mypage/resHis' },
      { label: '예약번호로 찾기', path: '/mypage/resNum' },
    ],
  },
  {
    title: '관심상품',
    items: [
      { label: '찜한 상품', path: '/mypage/wishlist' },
      { label: '최근 본 상품', path: '/mypage/recent' },
    ],
  },
  {
    title: '개인정보',
    items: [
      { label: '회원정보 수정', path: '/mypage/info' },
      { label: '비밀번호 변경', path: '/mypage/password' },
      { label: '회원 탈퇴', path: '/mypage/withdraw' },
    ],
  },
]

export default function MypageSlideBar() {
  return (
    <aside className="border-border w-64 shrink-0 border px-8 py-10">
      <h2 className="mb-10 text-2xl font-bold">마이페이지</h2>
      {sidebarData.map((section, index) => (
        <SidebarSection
          key={index}
          title={section.title}
          defaultOpen={section.defaultOpen}
          items={section.items}
        />
      ))}
    </aside>
  )
}
