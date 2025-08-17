import type { Client } from '@/hooks/useGetHonoClient'
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useNotifications } from '@/hooks'
import { useGetHonoClient } from '@/hooks/useGetHonoClient'
import { PROGRAMS_QUERY_KEY } from './useGetPrograms'

export interface RemoveProgramRequest {
  id: number
}

export async function removeProgram(client: Client, payload: RemoveProgramRequest) {
  const response = await client.programs.$delete({
    query: {
      id: payload.id,
    },
  })

  if (!response.ok) {
    throw new Error('Unable to remove program. Please try again in a moment.')
  }
}

export function useRemoveProgram() {
  const { client } = useGetHonoClient()
  const queryClient = useQueryClient()
  const { success, error } = useNotifications()

  return useMutation({
    onSuccess: () => {
      success({
        message: `Removed program successfully.`,
      })

      queryClient.invalidateQueries({
        queryKey: [PROGRAMS_QUERY_KEY],
      })
    },
    onError: (_err: Error) => {
      error({
        message: 'Unable to remove program. Please try again in a moment',
      })
    },
    mutationFn: (payload: RemoveProgramRequest) => removeProgram(client, payload),
  })
}
