import type { FlightResponse } from '@/types/flights'
import { useQuery } from '@tanstack/react-query'

export default function useSoldMap(monthFlights: FlightResponse[], year: number, month: number) {
  return useQuery({
    queryKey: ['soldMap', year, month],
    queryFn: () => {
      const map: Record<number, boolean> = {}
      monthFlights.forEach((f) => {
        map[f.id] = Math.random() < 0.2
      })
      return map
    },
    enabled: monthFlights.length > 0,
    staleTime: Infinity,
    gcTime: Infinity,
  })
}
