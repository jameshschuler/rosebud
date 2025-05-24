import { Box, Button, Divider, Flex, Title } from '@mantine/core'
import dayjs from 'dayjs'
import { useTransformCheckIns } from '@/hooks'
import { useGetAllCheckIns } from '@/hooks/api/useGetCheckIns'
import { ListSkeleton } from './ListSkeleton'
import { NoData } from './NoData'

interface CheckInsListProps {
  onClick: (id?: number) => void
  selectedCheckIn?: number
}

export function CheckInsList({ onClick, selectedCheckIn }: CheckInsListProps) {
  const { isLoading, data, error } = useGetAllCheckIns()
  const { checkIns, hasCheckIns } = useTransformCheckIns(data)

  return (
    <Box py="xl">
      {isLoading && <ListSkeleton />}
      {error && (
        <div>
          Error:
          {error.message}
        </div>
      )}
      {!error && !isLoading && data && (
        <Flex direction="column">
          {!hasCheckIns && <NoData onAction={open} />}

          {[...checkIns].map(([year, months]) => (
            <Box key={year}>
              <Title order={2}>{year}</Title>
              <Flex direction="column" mt="lg" gap={32}>
                {[...months].map(([month, data]) => (
                  <Box key={month}>
                    <Title size="md" order={3}>
                      {month}
                    </Title>
                    <Flex gap={16} wrap="wrap" mt="md">
                      {data.map(d => (
                        <Button
                          style={{
                            boxShadow: `4px 4px 0px ${selectedCheckIn === d.id ? 'var(--mantine-color-yellow-6)' : 'black'}`,
                          }}
                          onClick={() => {
                            if (selectedCheckIn === d.id) {
                              onClick(undefined)
                            }
                            else {
                              onClick(d.id)
                            }
                          }}
                          w={140}
                          key={d.id}
                          variant="outline"
                          color="black"
                          radius="md"
                        >
                          {dayjs(d.checkInDate).format('MMMM DD')}
                        </Button>
                      ))}
                    </Flex>
                  </Box>
                ))}
              </Flex>
              <Divider my="xl" />
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  )
}
