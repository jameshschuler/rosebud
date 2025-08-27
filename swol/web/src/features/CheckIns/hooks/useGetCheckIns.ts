import { queryOptions, useQuery } from '@tanstack/react-query'
import { useAuth } from '@/hooks'
import { client } from '@/lib/honoClient'

export const CHECKINS_QUERY_KEY = 'check-ins'

export function getAllCheckInsQueryOptions(accessToken?: string, year?: string, month?: string) {
  return queryOptions({
    queryKey: [CHECKINS_QUERY_KEY, year, month],
    queryFn: async () => {
      const res = await client['check-ins'].$get({
        query: {
          year,
          month,
        },
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      })
      const data = await res.json()
      
      return data
    },
  })
}

export function useGetAllCheckIns(year?: string, month?: string) {
  const { session } = useAuth()
  const options = getAllCheckInsQueryOptions(session?.access_token, year, month)
  return useQuery(options)
}
