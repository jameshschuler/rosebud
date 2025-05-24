import { queryOptions, useQuery } from '@tanstack/react-query'
import type { Client } from '../useGetHonoClient'
import { useGetHonoClient } from '../useGetHonoClient'

export function getAllCheckInsQueryOptions(client: Client) {
  return queryOptions({
    queryKey: ['get-all-check-ins'],
    queryFn: async () => {
      if (!client) {
        return
      }

      const res = await client['check-ins'].$get()
      if (!res.ok) {
        throw new Error('server error')
      }
      const data = await res.json()
      console.log(data)
      return data
    },
  })
}

export function useGetAllCheckIns() {
  const { client } = useGetHonoClient()
  const options = getAllCheckInsQueryOptions(client)

  return useQuery(options)
}
