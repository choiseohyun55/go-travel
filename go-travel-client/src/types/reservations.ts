export interface ReservationItem {
  id: number
  productName: string
  orderAt: string
  deptDate: string
  participants: number
  price: number
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED'
}
