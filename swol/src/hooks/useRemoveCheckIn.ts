import { PostgrestSingleResponse } from '@supabase/supabase-js'
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'
import { supabase } from '../lib'

export interface RemoveCheckInRequest {
  checkInId: number
  userId: string
}

async function removeCheckIn({
  checkInId,
  userId,
}: RemoveCheckInRequest): Promise<PostgrestSingleResponse<null>> {
  return supabase
    .from('gym_checkin')
    .delete()
    .eq('id', checkInId)
    .eq('user_id', userId)
    .throwOnError()
}

export function useRemoveCheckIn(): UseMutationResult<
  PostgrestSingleResponse<null>,
  Error,
  RemoveCheckInRequest
> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: RemoveCheckInRequest) => removeCheckIn(request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['checkIns'],
      })
    },
  })
}
