export function formatPhone(value: string) {
  if (!value) return ''

  // 숫자만 추출
  let digits = value.replace(/\D/g, '')

  // 최대 11자리 제한 (010 기준)
  if (digits.length > 11) digits = digits.slice(0, 11)

  // 포매팅
  if (digits.length <= 3) return digits
  if (digits.length <= 7) return digits.replace(/(\d{3})(\d+)/, '$1-$2')
  return digits.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3')
}
