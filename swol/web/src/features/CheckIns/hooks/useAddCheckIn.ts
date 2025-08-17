import type { Client } from '@/hooks/useGetHonoClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotifications } from '@/hooks'
import { useGetHonoClient } from '@/hooks/useGetHonoClient'
import { CHECKINS_QUERY_KEY } from './useGetCheckIns'

export interface AddCheckInRequest {
  activityId: number
  checkinDate: string
  notes?: string
  programId?: number
}

export async function addCheckIn(client: Client, payload: AddCheckInRequest) {
  const response = await client!['check-ins'].$post({
    json: payload,
  })

  if (!response.ok) {
    throw new Error('Unable to add check in. Please try again in a moment.')
  }

  return response.json()
}

export function useAddCheckIn() {
  const { client } = useGetHonoClient()
  const queryClient = useQueryClient()

  const { success, error } = useNotifications()

  return useMutation({
    onSuccess: () => {
      success({
        message: `Added check in successfully.`,
      })

      queryClient.invalidateQueries({
        queryKey: CHECKINS_QUERY_KEY,
      })
    },
    onError: (_err: Error) => {
      error({
        message: 'Unable to add check in. Please try again in a moment.',
      })
    },
    mutationFn: (payload: AddCheckInRequest) => addCheckIn(client, payload),
  })
}
