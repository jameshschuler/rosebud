import type { Client } from '@/hooks/useGetHonoClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotifications } from '@/hooks'
import { useGetHonoClient } from '@/hooks/useGetHonoClient'
import { PROGRAMS_QUERY_KEY } from './useGetPrograms'

export interface AddProgramRequest {
  name: string
  programType: string
  active: boolean
  author: string
  description?: string
}

export async function addProgram(client: Client, payload: AddProgramRequest) {
  const response = await client.programs.$post({
    json: payload,
  })

  if (!response.ok) {
    throw new Error('Unable to add check in. Please try again in a moment.')
  }

  return response.json()
}

export function useAddProgram() {
  const { client } = useGetHonoClient()
  const queryClient = useQueryClient()

  const { success, error } = useNotifications()

  return useMutation({
    onSuccess: () => {
      success({
        message: `Added program successfully.`,
      })

      queryClient.invalidateQueries({
        queryKey: [PROGRAMS_QUERY_KEY],
      })
    },
    onError: (_err) => {
      error({
        message: 'Unable to add program. Please try again in a moment.',
      })
    },
    mutationFn: (payload: AddProgramRequest) => addProgram(client, payload),
  })
}
