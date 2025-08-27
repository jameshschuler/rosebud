import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth, useNotifications } from '@/hooks'
import { client } from '@/lib/honoClient'
import { CHECKINS_QUERY_KEY } from './useGetCheckIns'

export interface AddCheckInRequest {
  activityId: number
  checkinDate: string
  notes?: string
  programId?: number
}

export async function addCheckIn(payload: AddCheckInRequest, accessToken?: string) {
  const response = await client['check-ins'].$post({
    json: payload,
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Unable to add check in. Please try again in a moment.')
  }

  return response.json()
}

export function useAddCheckIn() {
  const { session } = useAuth()
  const queryClient = useQueryClient()

  const { success, error } = useNotifications()

  return useMutation({
    onSuccess: () => {
      success({
        message: `Added check in successfully.`,
      })

      queryClient.invalidateQueries({
        queryKey: [CHECKINS_QUERY_KEY],
      })
    },
    onError: (_err: Error) => {
      error({
        message: 'Unable to add check in. Please try again in a moment.',
      })
    },
    mutationFn: (payload: AddCheckInRequest) => addCheckIn(payload, session?.access_token),
  })
}
