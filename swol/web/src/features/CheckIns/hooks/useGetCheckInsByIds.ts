import { queryOptions, useQuery } from '@tanstack/react-query'
import { useAuth } from '@/hooks'
import { client } from '@/lib/honoClient'

export const CHECKINS_BY_IDS_QUERY_KEY = 'check-ins-by-ids'

export interface CheckInQueryParams {
  ids?: number[]
}

export function getAllCheckInsByIdsQueryOptions(accessToken?: string, params?: CheckInQueryParams) {
  return queryOptions({
    queryKey: [CHECKINS_BY_IDS_QUERY_KEY, params?.ids],
    queryFn: async () => {
      const res = await client['check-ins'].$get({
        query: {
          ids: params?.ids?.join(','),
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
    enabled: params?.ids !== undefined && params?.ids.length > 0,
  })
}

export function useGetAllCheckInsByIds(params?: CheckInQueryParams) {
  const { session } = useAuth()
  const options = getAllCheckInsByIdsQueryOptions(session?.access_token, params)
  return useQuery(options)
}
