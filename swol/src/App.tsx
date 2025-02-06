import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import { useAuth } from './AuthProvider'
import { supabase } from './lib'

import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Modal,
  Skeleton,
  Title,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useMemo } from 'react'
import { useGetCheckIns } from './hooks/useGetCheckIns'

dayjs.extend(utc)

interface CheckIn {
  id: number
  checkin_date: string
}

// TODO: setup eslint
// TODO: setup prettier

// TODO: move to hook and useMutation
async function saveCheckIn(userId: string, date: Date | null) {
  if (!date) {
    return
  }

  const { data, error } = await supabase.from('gym_checkin').insert({
    user_id: userId,
    checkin_date: dayjs(date).utc().format(),
  })

  if (error) {
    console.error('Error saving check-in:', error.message)
    return
  }

  console.log('Check-in saved:', data)
}

export function AppBar() {
  const { user } = useAuth()

  const initials = (user?.user_metadata?.full_name ?? '')
    .split(' ')
    .map((n: string[]) => n[0])
    .join('')

  return (
    <Flex justify="space-between" align="center">
      <Title>Swol</Title>
      <Box>
        <Avatar radius="xl">{initials}</Avatar>
      </Box>
    </Flex>
  )
}

export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <Flex direction="column" gap={8}>
      {[...Array(count)].map((_, i) => (
        <Skeleton key={i} height={50} radius="lg" />
      ))}
    </Flex>
  )
}

export function NoData() {
  return (
    <Box>
      <Title>No check-ins found</Title>
    </Box>
  )
}

function App() {
  const { auth, signIn, signOut, user } = useAuth()

  const [opened, { open, close }] = useDisclosure(false)

  const { data, error, isLoading, refetch } = useGetCheckIns(user?.id)

  const checkIns = useMemo(() => {
    const checkIns = new Map<
      string,
      Map<string, { id: number; checkInDate: string }[]>
    >()

    if (!data) {
      return checkIns
    }

    data.forEach((d) => {
      const date = dayjs(d.checkin_date)
      const year = date.format('YYYY')
      const month = date.format('MMMM')

      if (!checkIns.has(year)) {
        checkIns.set(year, new Map())
      }

      const yearMap = checkIns.get(year)
      const monthCheckIns = yearMap?.get(month)
      if (!monthCheckIns) {
        yearMap?.set(month, [
          { id: d.id, checkInDate: dayjs(d.checkin_date).format('MM-DD-YYYY') },
        ])
      } else {
        monthCheckIns.push({
          id: d.id,
          checkInDate: dayjs(d.checkin_date).format('MM-DD-YYYY'),
        })
      }
    })

    return checkIns
  }, [data])

  if (!auth || !user) {
    // TODO: improve design
    return (
      <Flex justify="center" align="center" style={{ height: '100vh' }}>
        <button onClick={signIn}>Sign In</button>
      </Flex>
    )
  }

  return (
    <>
      <Box p="xl">
        <AppBar />
        <Container size="lg" py="xl">
          <Flex justify="space-between" align="center" mt="xl">
            <Title>Check Ins</Title>
            <Flex gap={8} align="center">
              {false && (
                <ActionIcon
                  variant="transparent"
                  aria-label="Delete Check In"
                  color="pink"
                >
                  <FontAwesomeIcon icon={faTrashCan} size="xl" />
                </ActionIcon>
              )}
              <Button
                leftSection={<FontAwesomeIcon icon={faPlus} size="xl" />}
                variant="filled"
                color="green"
              >
                Add Check In
              </Button>
            </Flex>
          </Flex>
          <Box py="xl">
            {isLoading && <ListSkeleton />}
            {error && <div>Error: {error.message}</div>}
            {!error && !isLoading && data && (
              <Flex direction="column">
                {checkIns.size === 0 && <NoData />}

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
                            {data.map((d) => (
                              <Button
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
        </Container>
      </Box>
      <Modal.Root opened={opened} onClose={close} size="lg">
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Add Check In</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>Modal content</Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  )
}

export default App
