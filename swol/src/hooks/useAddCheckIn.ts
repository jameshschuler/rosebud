import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { supabase } from '../lib'

async function addCheckIn(date: string, userId: string) {
  return supabase
    .from('gym_checkin')
    .insert({
      user_id: userId,
      checkin_date: dayjs(date).utc().format(),
    })
    .throwOnError()
    .select<string, { id: number; checkin_date: string }>('*')
    .throwOnError()
    .single()
}

export function useAddCheckIn() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ date, userId }: { date: string; userId: string }) =>
      addCheckIn(date, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['checkIns'],
      })
    },
  })
}
