import { queryOptions, useQuery } from '@tanstack/react-query'
import { useAuth } from '@/hooks'
import { client } from '@/lib/honoClient'

export const PROGRAMS_QUERY_KEY = 'programs'

export function getProgramsQueryOptions(query?: string, accessToken?: string) {
  return queryOptions({
    queryKey: [PROGRAMS_QUERY_KEY, query],
    queryFn: async () => {
      if (!client) {
        return {
          programs: [],
          currentPrograms: {},
        }
      }

      const res = await client.programs.$get({
        query: query ? { author: query, name: query } : {},
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      })

      if (!res.ok) {
        throw new Error('server error')
      }

      const data = await res.json()
      return data
    },
  })
}

export function useGetPrograms(query?: string) {
  const { session } = useAuth()
  const options = getProgramsQueryOptions(query, session?.access_token)

  return useQuery(options)
}
