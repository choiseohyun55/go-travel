export default function formatDateTime(isoString: string) {
  const d = new Date(isoString)

  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()

  const hour = d.getHours().toString().padStart(2, '0')
  const minute = d.getMinutes().toString().padStart(2, '0')

  return `${year}/${month}/${day} ${hour}:${minute}`
}
