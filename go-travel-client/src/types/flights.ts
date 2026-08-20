export interface Flight {
  id: number
  locationId: number
  airline: string
  flightNo: string
  date: string
  depart: string
  arrive: string
  price: number
  soldOut: boolean
}

export interface FlightResponse {
  id: number
  locationId: number
  locationName: string
  airline: string
  flightNumber: string
  deptDate: string // "2025-11-20"
  deptTime: string // "2025-11-20T09:15:00"
  arrivalTime: string
  price: number
}
