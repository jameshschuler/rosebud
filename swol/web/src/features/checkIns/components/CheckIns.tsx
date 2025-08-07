import { Box } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useGetAllCheckIns } from '@/features/CheckIns/hooks/useGetCheckIns'
import { useTransformCheckIns } from '../hooks/useTransformCheckIns'
import { CheckInsHeader } from './CheckInsHeader'
import { CheckInsList } from './CheckInsList'
import { CreateEditDrawer } from './CreateEditDrawer'
import { Error } from './Error'
import { ListSkeleton } from './ListSkeleton'
import { NoData } from './NoData'

export function CheckIns() {
  const { isLoading, data, error, refetch } = useGetAllCheckIns()
  const { checkIns, hasCheckIns } = useTransformCheckIns(data)
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <Box>
      <CheckInsHeader hasCheckIns={hasCheckIns} onAddCheckIn={open} />
      <Box py="xl">
        {isLoading && <ListSkeleton />}
        {error && (
          <Error
            message={error.message}
            onRetry={async () => {
              await refetch()
            }}
          />
        )}
        {!isLoading && !hasCheckIns && !error && <NoData onAction={open} />}
        {!error && !isLoading && hasCheckIns && (
          <CheckInsList checkIns={checkIns} />
        )}
      </Box>

      <CreateEditDrawer opened={opened} close={close} />
    </Box>
  )
}
