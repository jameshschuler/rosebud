import { queryOptions, useQuery } from '@tanstack/react-query'
import { useAuth } from '@/hooks'
import { client } from '@/lib/honoClient'

export const PROGRAM_QUERY_KEY = 'program'

export function getProgramQueryOptions(programId?: number, accessToken?: string) {
  return queryOptions({
    queryKey: [PROGRAM_QUERY_KEY, programId],
    queryFn: async () => {
      const res = await client.programs[':id'].$get({
        param: { id: programId },
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
    enabled: !!programId,
  })
}

export function useGetProgram(programId?: number) {
  const { session } = useAuth()
  const options = getProgramQueryOptions(programId, session?.access_token)

  return useQuery(options)
}
