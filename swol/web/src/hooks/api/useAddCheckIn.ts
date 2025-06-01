import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Client, useGetHonoClient } from "../useGetHonoClient"
import { CHECKINS_QUERY_KEY } from "./useGetCheckIns"

export interface AddCheckInRequest {
    activityId: 1 | 2
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

export function useAddCheckIn() {
    const { client } = useGetHonoClient()
    const queryClient = useQueryClient()

    return useMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: CHECKINS_QUERY_KEY,
            });
        },
        mutationFn: (payload: AddCheckInRequest) => addCheckIn(client, payload),
    })
}