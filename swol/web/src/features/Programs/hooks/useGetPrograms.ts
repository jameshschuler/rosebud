import type { Client } from '@/hooks/useGetHonoClient'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { useGetHonoClient } from '@/hooks/useGetHonoClient'

export const PROGRAMS_QUERY_KEY = ['programs']

export function getAllProgramsQueryOptions(client: Client) {
  return queryOptions({
    queryKey: PROGRAMS_QUERY_KEY,
    queryFn: async () => {
      if (!client) {
        return {
          programs: [],
          currentPrograms: {},
        }
      }

      const res = await client.programs.$get({
        query: {},
      })

      if (!res.ok) {
        throw new Error('server error')
      }

      const data = await res.json()
      return data
    },
  })
}

export function useGetPrograms() {
  const { client } = useGetHonoClient()
  const options = getAllProgramsQueryOptions(client)

  return useQuery(options)
}
