import { Activity, CheckInDisplayItem } from '@/features/tempCheckIns/types/checkIns';
import { useModal } from '@/hooks';
import { Box, Divider, Flex, Title } from '@mantine/core';
import { useState } from 'react';
import { CheckInCard } from './CheckInCard';
import { CheckInDetailsModal } from './CheckInDetailsModal';

interface CheckInsListProps {
  checkIns: CheckInDisplayItem
}

export function CheckInsList({ checkIns }: CheckInsListProps) {
  const [selectedCheckIns, setSelectedCheckIns] = useState<{ checkInDate: string, details: { id: number, activity: Activity }[] }>()
  const detailsModal = useModal(false)

  return (
    <>
      <Flex direction="column">
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
                    {[...data].map(([checkInDate, details]) => (
                      <CheckInCard key={checkInDate} activityCount={details.length} checkInDate={checkInDate} onClick={() => {
                        setSelectedCheckIns({
                          checkInDate,
                          details
                        })
                        detailsModal.open()
                      }} />
                    ))}
                  </Flex>
                </Box>
              ))}
            </Flex>
            <Divider my="xl" />
          </Box>
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
