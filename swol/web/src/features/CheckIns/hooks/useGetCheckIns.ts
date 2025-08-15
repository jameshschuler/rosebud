import type { Client } from '@/hooks/useGetHonoClient'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { useGetHonoClient } from '@/hooks/useGetHonoClient'

export const CHECKINS_QUERY_KEY = ['check-ins']

export function getAllCheckInsQueryOptions(client: Client) {
  return queryOptions({
    queryKey: CHECKINS_QUERY_KEY,
    queryFn: async () => {
      const res = await client['check-ins'].$get()
      const data = await res.json()
      
      return data
    },
  })
}

export function useGetAllCheckIns() {
  const { client } = useGetHonoClient()
  const options = getAllCheckInsQueryOptions(client)

  return useQuery(options)
}
