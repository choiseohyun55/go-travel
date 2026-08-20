import { fakerKO as faker } from '@faker-js/faker'

faker.seed(202501)

const sentenceTemplates = [
  '사진보다 실제가 훨씬 예뻤어요. 다음에도 꼭 다시 오고 싶어요.',
  '자유 시간이 적당해서 쇼핑도 하고 휴식도 충분히 할 수 있었습니다.',
  '숙소가 생각보다 훨씬 깔끔했고 조식도 맛있었어요.',
  '이동 동선이 효율적으로 짜여 있어서 피로하지 않고 좋았습니다.',
  '설명도 자세하고 유머러스해서 여행 내내 분위기가 좋았어요.',
  '날씨가 좋아서 사진도 많이 찍었고 좋은 추억 만들고 왔습니다.',
  '단체 여행이라 걱정했는데 구성도 좋고 모두 배려해 주셔서 즐거웠어요.',
  '식사 메뉴가 다양하고 맛있어서 만족스러웠습니다.',
  '전체적으로 일정이 너무 타이트하지 않아서 여유롭고 좋았습니다.',
  '가족끼리 다녀왔는데 모두 행복한 추억을 만들고 왔어요, 강력 추천합니다!',
  '처음으로 패키지여행을 선택했는데 일정이 정말 체계적이었어요.',
  '이동시간도 효율적으로 짜여 있어서 피로하지 않았고, 가이드님 설명이 재밌어서 여행 내내 웃으면서 다녔습니다.',
  '일정이 알차고 가이드님이 친절해서 정말 즐거운 여행이었어요! 다음에도 꼭 이용하고 싶어요.',
]

let cachedReviews: any[] | null = null

export function createMockReviews(count = 3) {
  if (cachedReviews) return cachedReviews

  cachedReviews = Array.from({ length: count }).map(() => ({
    rating: faker.number.int({ min: 3, max: 5 }),
    text: faker.helpers.arrayElement(sentenceTemplates),
    author: `${faker.person.lastName()}*${faker.person.firstName().charAt(0)}`,
    date: faker.date.past({ years: 2 }).toISOString().slice(0, 10),
  }))

  return cachedReviews
}
