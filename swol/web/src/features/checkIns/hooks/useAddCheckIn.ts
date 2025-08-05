import { Client, useGetHonoClient } from "@/hooks/useGetHonoClient"
import { useNotifications } from "@mantine/notifications"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CHECKINS_QUERY_KEY } from "./useGetCheckIns"

export interface AddCheckInRequest {
    activityIds: number[]
    checkinDate: string
}

export const addCheckIn = async (client: Client, payload: AddCheckInRequest) => {
    try {
        const response = await client!["check-ins"].$post({
            json: payload
        })

        if (!response.ok) {
            throw new Error('Unable to add check in. Please try again in a moment.');
        }

        return response.json();
    } catch (err) {
        throw err;
    }
}


// TODO: use onError callback to show error notification
export function useAddCheckIn() {
    const { client } = useGetHonoClient()
    const queryClient = useQueryClient()

    const { success, error } = useNotifications()

    return useMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: CHECKINS_QUERY_KEY,
            });
        },
        mutationFn: (payload: AddCheckInRequest) => addCheckIn(client, payload),
    })
}