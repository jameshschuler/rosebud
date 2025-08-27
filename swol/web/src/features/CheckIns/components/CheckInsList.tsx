import type { Activity, CheckInDisplayItem } from '@/features/CheckIns/types/checkIns'
import { Button, Divider, Flex, Title } from '@mantine/core'
import { useState } from 'react'
import { useModal } from '@/hooks'
import { CheckInCard } from './CheckInCard'
import { CheckInDetailsModal } from './CheckInDetailsModal'

interface CheckInsListProps {
  checkIns: CheckInDisplayItem
  loadMore: () => void
  loading: boolean
  hasMore: boolean
}

export function CheckInsList({ checkIns, loadMore, loading, hasMore }: CheckInsListProps) {
  const [selectedCheckIns, setSelectedCheckIns] = useState<{
    checkInDate: string
    details: { id: number, activity: Activity }[]
  }>()
  const detailsModal = useModal(false)

  return (
    <>
      <Flex direction="column">
        {[...checkIns].map(([year, months]) => (
          <Flex direction="column" gap={32} key={year}>
            <Title order={2}>{year}</Title>
            <Flex direction="column" gap={32}>
              {[...months].map(([month, data]) => (
                <Flex direction="column" gap={16} key={month}>
                  <Title size="md" order={3}>
                    {month}
                  </Title>
                  <Flex gap={16} wrap="wrap">
                    {[...data].map(([checkInDate, details]) => (
                      <CheckInCard
                        key={checkInDate}
                        activityCount={details.length}
                        checkInDate={checkInDate}
                        onClick={() => {
                          setSelectedCheckIns({
                            checkInDate,
                            details,
                          })
                          detailsModal.open()
                        }}
                      />
                    ))}
                  </Flex>
                </Flex>
              ))}
            </Flex>
            <Divider mb={32} />
          </Flex>
        ))}
        <Button disabled={!hasMore} loading={loading} style={{ alignSelf: 'center' }} size="md" variant="outline" color="gray" onClick={loadMore}>Load more</Button>
      </Flex>
      <CheckInDetailsModal
        selectedCheckIns={selectedCheckIns}
        opened={detailsModal.opened}
        close={() => {
          setSelectedCheckIns(undefined)
          detailsModal.close()
        }}
      />
    </>
  )
}
