import { Link } from 'react-router'

export default function Footer() {
  return (
    <footer>
      {/* 메뉴 */}
      <div className="border-t border-gray-200 py-3">
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap gap-5 px-6 py-3 text-sm">
          {[
            '고객센터',
            '공지사항',
            '자주하는질문',
            '1:1문의',
            '견적문의',
            '여행후기',
            '칭찬합시다',
            '무이자할부',
            '현금영수증',
          ].map((text) => (
            <Link key={text} to="#" className="hover:text-muted">
              {text}
            </Link>
          ))}
        </div>
      </div>

      {/* 센터 */}
      <div className="mx-auto flex w-full max-w-[1200px] items-start justify-between px-6 py-10">
        {/* 고객센터 */}
        <div className="max-w-lg">
          <h3 className="mb-2 text-lg font-semibold">여행가자 고객센터</h3>
          <p className="text-muted-foreground text-sm">
            상담시간: 평일 오전 9시 ~ 오후 6시 (토,일요일 및 공휴일 휴무)
          </p>
          <p className="text-muted-foreground text-sm">
            · 해외항공권 변경, 투어&티켓, 렌터카 취소/변경/환불: 평일 오후 5시까지
          </p>
          <p className="text-muted-foreground text-sm">· 호텔 취소/변경/환불: 평일 오후 4시까지</p>
        </div>

        {/* 연락처 */}
        <div className="flex gap-16">
          {[
            { icon: '🧳', title: '패키지여행 상담', phone: '1544-0000' },
            { icon: '✈️', title: '자유여행 상담', phone: '1644-0000' },
            { icon: '💼', title: '부산/지방출발 상담', phone: '051-700-0000' },
          ].map((contact) => (
            <div key={contact.title} className="text-center">
              <div className="mb-2 text-2xl">{contact.icon}</div>
              <span className="text-muted-foreground text-xs">{contact.title}</span>
              <strong className="mt-1 block text-xl">{contact.phone}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 */}
      <div className="text-muted-foreground pt-4 pb-10 text-center text-xs">
        © 2025 여행가자. All Rights Reserved.
      </div>
    </footer>
  )
}
