export function getStableRating(id: number) {
  // 상품 id 기반 seed 생성
  const seed = (Math.sin(id) + 1) * 10000
  const random = seed - Math.floor(seed)
  return (3 + random * 2).toFixed(1)
}
