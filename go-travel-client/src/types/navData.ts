export interface NavItem {
  id: number
  name: string
}

export interface NavRegion {
  title: string
  items: NavItem[]
}

export type NavData = Record<string, NavRegion>

export const NAV_DATA: NavData = {
  europe: {
    title: '유럽',
    items: [
      { id: 1, name: '서유럽' },
      { id: 2, name: '동유럽' },
      { id: 3, name: '발칸' },
      { id: 4, name: '스페인/포르투갈/모로코' },
      { id: 5, name: '튀르키예(터키)/그리스' },
      { id: 6, name: '북유럽/발틱' },
      { id: 7, name: '두바이/이집트/사우디' },
    ],
  },

  southeast: {
    title: '동남아',
    items: [
      { id: 8, name: '방콕/파타야' },
      { id: 9, name: '푸켓/카오락' },
      { id: 10, name: '치앙마이/치앙라이' },
      { id: 11, name: '싱가포르/바탐' },
      { id: 12, name: '브루나이' },
      { id: 13, name: '코타키나발루/쿠알라룸프르' },
      { id: 14, name: '인도네시아/마나도' },
      { id: 15, name: '하노이/하롱베이' },
      { id: 16, name: '다낭/호이안/후에' },
      { id: 17, name: '나트랑&달랏' },
      { id: 18, name: '푸꾸옥' },
      { id: 19, name: '캄보디아/베트남 연계' },
      { id: 20, name: '라오스' },
      { id: 21, name: '보라카이' },
      { id: 22, name: '세부' },
      { id: 23, name: '보홀' },
      { id: 24, name: '발리' },
      { id: 25, name: '인도/네팔/스리랑카' },
      { id: 26, name: '마닐라/클락/코론/엘니도' },
      { id: 27, name: '호치민/판티엣/사파' },
    ],
  },

  japan: {
    title: '일본',
    items: [
      { id: 28, name: '북해도' },
      { id: 29, name: '후쿠오카' },
      { id: 30, name: '오사카/교토/고베' },
      { id: 31, name: '동경/시즈오카/이바라키' },
      { id: 32, name: '오키나와/미야코지마/이시가키' },
      { id: 33, name: '오이타/사가/우베/야마구치' },
      { id: 34, name: '아오모리/니가타/아키타' },
      { id: 35, name: '요나고/나고야/알펜루트' },
      { id: 36, name: '마츠야마' },
      { id: 37, name: '다카마츠/나오시마/도쿠시마' },
      { id: 38, name: '대마도/선박여행' },
    ],
  },

  china: {
    title: '중국/몽골',
    items: [
      { id: 39, name: '장가계' },
      { id: 40, name: '백두산' },
      { id: 41, name: '태항산' },
      { id: 42, name: '황산/신선거' },
      { id: 43, name: '계림/망산(천저우)' },
      { id: 44, name: '여강(리장)/곤명' },
      { id: 45, name: '구채구/성도' },
      { id: 46, name: '중경/귀양' },
      { id: 47, name: '북경(베이징)' },
      { id: 48, name: '상해(상하이)' },
      { id: 49, name: '서안/정주' },
      { id: 50, name: '칭다오(청도)' },
      { id: 51, name: '대련' },
      { id: 52, name: '연태/위해/천진' },
      { id: 53, name: '하문(샤먼)' },
      { id: 54, name: '하얼빈/하이난' },
      { id: 55, name: '광동성/홍콩/마카오/충칭' },
      { id: 56, name: '우루무치/티벳' },

      { id: 57, name: '몽골/내몽골' },
    ],
  },

  taiwan: {
    title: '대만/홍콩/마카오',
    items: [
      { id: 58, name: '대만' },
      { id: 59, name: '홍콩/마카오' },
    ],
  },

  australia: {
    title: '호주/뉴질랜드',
    items: [
      { id: 60, name: '호주' },
      { id: 61, name: '타히티' },
      { id: 62, name: '뉴질랜드' },
    ],
  },

  guam: {
    title: '괌/사이판',
    items: [
      { id: 63, name: '괌' },
      { id: 64, name: '사이판' },
    ],
  },

  america: {
    title: '미주/캐나다/하와이',
    items: [
      { id: 65, name: '하와이' },
      { id: 66, name: '미서부' },
      { id: 67, name: '미동부' },
      { id: 68, name: '미남부' },
      { id: 69, name: '미주 연계' },
      { id: 70, name: '알래스카' },
      { id: 71, name: '캐나다' },
    ],
  },

  africa: {
    title: '중남미/아프리카',
    items: [
      { id: 72, name: '중남미' },
      { id: 73, name: '아프리카' },
    ],
  },

  centralasia: {
    title: '중앙아시아',
    items: [{ id: 74, name: '코카서스' }],
  },
}
