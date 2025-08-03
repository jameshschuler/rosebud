import { useGetAllCheckIns } from "@/hooks/api/useGetCheckIns";
import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CheckInsHeader } from "../../../components/CheckIns/CheckInsHeader";
import { CheckInsList } from "../../../components/CheckIns/CheckInsList";
import { CreateEditDrawer } from "../../../components/CheckIns/CreateEditDrawer";
import { Error } from "../../../components/CheckIns/Error";
import { ListSkeleton } from "../../../components/CheckIns/ListSkeleton";
import { NoData } from "../../../components/CheckIns/NoData";
import { useTransformCheckIns } from "../hooks/useTransformCheckIns";

export function CheckIns() {
    const { isLoading, data, error, refetch } = useGetAllCheckIns()
    const { checkIns, hasCheckIns } = useTransformCheckIns(data)
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <Box>
            <CheckInsHeader hasCheckIns={hasCheckIns} onAddCheckIn={open} />
            <Box py="xl">
                {isLoading && <ListSkeleton />}
                {error && <Error message={error.message} onRetry={async () => {
                    await refetch()
                }}
                />
                }
                {!isLoading && !hasCheckIns && !error && <NoData onAction={open} />}
                {!error && !isLoading && hasCheckIns && (
                    <CheckInsList checkIns={checkIns} />
                )}
            </Box>

            <CreateEditDrawer opened={opened} close={close} />
        </Box>
    )
}