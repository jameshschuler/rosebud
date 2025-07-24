import { useModal, useTransformCheckIns } from "@/hooks";
import { useGetAllCheckIns } from "@/hooks/api/useGetCheckIns";
import { Box } from "@mantine/core";
import { AddCheckInModal } from "./AddCheckInModal";
import { CheckInsHeader } from "./CheckInsHeader";
import { CheckInsList } from "./CheckInsList";
import { Error } from "./Error";
import { ListSkeleton } from "./ListSkeleton";
import { NoData } from "./NoData";

export function CheckIns() {
    const { isLoading, data, error, refetch } = useGetAllCheckIns()
    const { checkIns, hasCheckIns } = useTransformCheckIns(data)
    const addModal = useModal(false)

    return (
        <Box>
            <CheckInsHeader hasCheckIns={hasCheckIns} onAddCheckIn={addModal.open} />
            <Box py="xl">
                {isLoading && <ListSkeleton />}
                {error && <Error message={error.message} onRetry={async () => {
                    await refetch()
                }}
                />
                }
                {!isLoading && !hasCheckIns && !error && <NoData onAction={addModal.open} />}
                {!error && !isLoading && hasCheckIns && (
                    <CheckInsList checkIns={checkIns} />
                )}
            </Box>

            <AddCheckInModal opened={addModal.opened} close={addModal.close} />
        </Box>
    )
}