import type { Activity, CheckInDisplayItem } from '@/features/CheckIns/types/checkIns'
import { Divider, Flex, Title } from '@mantine/core'
import { useState } from 'react'
import { useModal } from '@/hooks'
import { CheckInCard } from './CheckInCard'
import { CheckInDetailsModal } from './CheckInDetailsModal'

interface CheckInsListProps {
  checkIns: CheckInDisplayItem
}

export function CheckInsList({ checkIns }: CheckInsListProps) {
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
