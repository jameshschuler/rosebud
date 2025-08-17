import type { Client } from '@/hooks/useGetHonoClient'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { useGetHonoClient } from '@/hooks/useGetHonoClient'

export const PROGRAMS_QUERY_KEY = 'programs'

export function getProgramsQueryOptions(client: Client, query?: string) {
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
  const { client } = useGetHonoClient()
  const options = getProgramsQueryOptions(client, query)

  return useQuery(options)
}
