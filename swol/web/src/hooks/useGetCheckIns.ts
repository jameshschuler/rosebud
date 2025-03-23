import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib'

async function getCheckIns(
  userId?: string,
): Promise<{ id: number; checkin_date: string }[]> {
  const { data, error } = await supabase
    .from('gym_checkin')
    .select('id, checkin_date')
    .order('checkin_date', { ascending: false })
    .eq('user_id', userId ?? '')

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export function useGetCheckIns(userId?: string) {
  return useQuery<{ id: number; checkin_date: string }[]>({
    queryKey: ['checkIns', userId],
    queryFn: () => getCheckIns(userId),
    enabled: !!userId,
  })
}
