import { queryOptions, useQuery } from '@tanstack/react-query'
import { useAuth } from '@/hooks'
import { client } from '@/lib/honoClient'

export const CHECKINS_QUERY_KEY = ['check-ins']

export function getAllCheckInsQueryOptions(accessToken?: string) {
  return queryOptions({
    queryKey: CHECKINS_QUERY_KEY,
    queryFn: async () => {
      const res = await client['check-ins'].$get({}, {
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

export function useGetAllCheckIns() {
  const { session } = useAuth()
  const options = getAllCheckInsQueryOptions(session?.access_token)
  return useQuery(options)
}
