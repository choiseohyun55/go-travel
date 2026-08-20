export interface TravelPackage {
  id: number
  region: string
  city: string
  name: string
  price: number
  days: number
  seats: number
  imageUrl?: string
  detailUrl?: string
  rating?: number
}

export interface Package {
  id: number
  region: string
  city: string
  name: string
  price: number
  days: number
  seats: number
  imageUrl: string
  detailUrl: string
  status: 'ACTIVE' | 'INACTIVE' | 'SOLD_OUT'
}
