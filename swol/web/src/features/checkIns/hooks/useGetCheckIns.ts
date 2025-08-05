import { Client, useGetHonoClient } from '@/hooks/useGetHonoClient'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const CHECKINS_QUERY_KEY = ['check-ins']

export function getAllCheckInsQueryOptions(client: Client) {
  return queryOptions({
    queryKey: CHECKINS_QUERY_KEY,
    queryFn: async () => {
      if (!client) {
        return []
      }

      const res = await client['check-ins'].$get()
      if (!res.ok) {
        throw new Error('server error')
      }
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
