import type { PostgrestSingleResponse } from '@supabase/supabase-js'
import type {
  UseMutationResult,
} from '@tanstack/react-query'
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import dayjs from 'dayjs'
import { supabase } from '../lib'

export interface AddCheckInRequest {
  date: Date
  userId: string
}

async function addCheckIn({
  date,
  userId,
}: AddCheckInRequest): Promise<
    PostgrestSingleResponse<{ id: number, checkin_date: string }>
  > {
  return supabase
    .from('gym_checkin')
    .insert({
      user_id: userId,
      checkin_date: dayjs(date).utc().format(),
    })
    .throwOnError()
    .select('*')
    .throwOnError()
    .single()
}

export function useAddCheckIn(): UseMutationResult<
  PostgrestSingleResponse<{
    id: number
    checkin_date: string
  }>,
  Error,
  AddCheckInRequest
> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: AddCheckInRequest) => addCheckIn(request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['checkIns'],
      })
    },
  })
}
