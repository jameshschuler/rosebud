import { useModal, useTransformCheckIns } from "@/hooks";
import { useGetAllCheckIns } from "@/hooks/api/useGetCheckIns";
import { Box } from "@mantine/core";
import { AddCheckInModal } from "./AddCheckInModal";
import { CheckInsHeader } from "./CheckInsHeader";
import { CheckInsList } from "./CheckInsList";
import { ListSkeleton } from "./ListSkeleton";
import { NoData } from "./NoData";

export function CheckIns() {
    const { isLoading, data, error } = useGetAllCheckIns()
    const { checkIns, hasCheckIns } = useTransformCheckIns(data)
    const addModal = useModal(false)

    return (
        <>
            <CheckInsHeader hasCheckIns={hasCheckIns} onAddCheckIn={addModal.open} />
            <Box py="xl">
                {isLoading && <ListSkeleton />}
                {error && (
                    <div>
                        Error:
                        {error.message}
                    </div>
                )}
                {!hasCheckIns && <NoData onAction={addModal.open} />}
                {!error && !isLoading && hasCheckIns && (
                    <CheckInsList checkIns={checkIns} />
                )}
            </Box>

            <AddCheckInModal opened={addModal.opened} close={addModal.close} />
        </>
    )
}