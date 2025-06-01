import { useModal } from '@/hooks';
import { Box, Button, Divider, Flex, Title } from '@mantine/core';
import dayjs from 'dayjs';
import { useState } from 'react';
import { CheckInDetailsModal } from './CheckInDetailsModal';

interface CheckInsListProps {
  checkIns: Map<string, Map<string, {
    id: number;
    checkInDate: string;
  }[]>>
}

export function CheckInsList({ checkIns }: CheckInsListProps) {
  const [selectedCheckIn, setSelectedCheckIn] = useState<number>()
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
                    {data.map(d => (
                      <Button
                        style={{
                          boxShadow: `4px 4px 0px ${selectedCheckIn === d.id ? 'var(--mantine-color-yellow-6)' : 'black'}`,
                        }}
                        onClick={() => {
                          setSelectedCheckIn(d.id)
                          detailsModal.open()
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
      <CheckInDetailsModal
        selectedCheckIn={selectedCheckIn}
        opened={detailsModal.opened}
        close={() => {
          setSelectedCheckIn(undefined)

          detailsModal.close()
        }}
      />
    </>
  )
}
