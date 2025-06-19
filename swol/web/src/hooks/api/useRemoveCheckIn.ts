import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { Client, useGetHonoClient } from "../useGetHonoClient"
import { CHECKINS_QUERY_KEY } from "./useGetCheckIns"

export interface RemoveCheckInRequest {
  checkInId: number
}

export const removeCheckIn = async (client: Client, payload: RemoveCheckInRequest) => {
    try {
        const response = await client!["check-ins"][':id'].$delete({
            param: {
                id: payload.checkInId,
            },
        })

        if (!response.ok) {
            throw new Error('Unable to remove check in. Please try again in a moment.');
        }

        return response.json();
    } catch (err) {
        throw err;
    }
}

export function useRemoveCheckIn() {
    const { client } = useGetHonoClient()
    const queryClient = useQueryClient()

    return useMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: CHECKINS_QUERY_KEY,
            });
        },
        mutationFn: (payload: RemoveCheckInRequest) => removeCheckIn(client, payload),
    })
}