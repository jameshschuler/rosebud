import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useAuth, useNotifications } from '@/hooks'
import { client } from '@/lib/honoClient'
import { CHECKINS_QUERY_KEY } from './useGetCheckIns'

export interface RemoveCheckInRequest {
  id: number
}

export async function removeCheckIn(payload: RemoveCheckInRequest, accessToken?: string) {
  const response = await client['check-ins'].$delete({
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
    throw new Error('Unable to remove check in(s). Please try again in a moment.')
  }
}

export function useRemoveCheckIn() {
  const { session } = useAuth()
  const queryClient = useQueryClient()
  const { success, error } = useNotifications()

  return useMutation({
    onSuccess: () => {
      success({
        message: `Removed check in successfully.`,
      })

      queryClient.invalidateQueries({
        queryKey: CHECKINS_QUERY_KEY,
      })
    },
    onError: (_err: Error) => {
      error({
        message: 'Unable to remove check in. Please try again in a moment.',
      })
    },
    mutationFn: (payload: RemoveCheckInRequest) => removeCheckIn(payload, session?.access_token),
  })
}
