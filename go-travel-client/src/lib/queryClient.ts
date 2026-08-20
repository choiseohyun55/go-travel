import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // React Query가 언제 refetch할지 기본 설정
      refetchOnWindowFocus: false, // 브라우저 탭 이동 시 자동 refetch X
      retry: 1, // 실패 시 재시도 횟수
      staleTime: 1000 * 60 * 5, // 5분간 데이터 fresh 상태 유지
    },
    mutations: {
      retry: 0, // mutation은 기본적으로 재시도 X
    },
  },
})
