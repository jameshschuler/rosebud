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
  const { checkIns } = useTransformCheckIns(data)
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <Box>
      <CheckInsHeader hasCheckIns={checkIns.size > 0} onAddCheckIn={open} />
      <Box>
        {isLoading && <ListSkeleton />}
        {error && (
          <Error
            message={error.message}
            onRetry={async () => {
              await refetch()
            }}
          />
        )}
        {!isLoading && data?.length === 0 && !error && <NoData onAction={open} />}
        {!error && !isLoading && checkIns.size > 0 && (
          <CheckInsList checkIns={checkIns} />
        )}
      </Box>

      <CreateEditDrawer opened={opened} close={close} />
    </Box>
  )
}
