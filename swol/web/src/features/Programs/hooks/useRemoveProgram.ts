import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useAuth, useNotifications } from '@/hooks'
import { client } from '@/lib/honoClient'
import { PROGRAMS_QUERY_KEY } from './useGetPrograms'

export interface RemoveProgramRequest {
  id: number
}

export async function removeProgram(payload: RemoveProgramRequest, accessToken?: string) {
  const response = await client.programs.$delete({
    param: {
      id: payload.id,
    },
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Unable to remove program. Please try again in a moment.')
  }
}

export function useRemoveProgram() {
  const { session } = useAuth()
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
    mutationFn: (payload: RemoveProgramRequest) => removeProgram(payload, session?.access_token),
  })
}
