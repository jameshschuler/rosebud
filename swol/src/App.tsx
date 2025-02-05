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
  Badge,
  Box,
  Container,
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
  return (
    <Flex justify="space-between" align="center">
      <Title>Swol</Title>
      <Box>
        <Avatar color="cyan" radius="xl">
          MK
        </Avatar>
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

function App() {
  const { auth, signIn, signOut, user } = useAuth()

  const [opened, { open, close }] = useDisclosure(false)

  const { data, error, isLoading, refetch } = useGetCheckIns(user?.id)

  const checkIns = useMemo(() => {
    // Set<'year', Map<'month', { id, checkInDate }>>
    return 'hello'
  }, [])

  if (!auth || !user) {
    // TODO:
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
          <Flex justify="space-between" align="center">
            <Title>Check Ins</Title>
            <Flex gap={8}>
              <ActionIcon
                variant="transparent"
                aria-label="Delete Check In"
                color="pink"
              >
                <FontAwesomeIcon icon={faTrashCan} size="xl" />
              </ActionIcon>
              <ActionIcon
                variant="transparent"
                aria-label="Add Check In"
                color="green"
                onClick={open}
              >
                <FontAwesomeIcon icon={faPlus} size="xl" />
              </ActionIcon>
            </Flex>
          </Flex>
          <Box py="lg">
            {isLoading && <ListSkeleton />}
            {error && <div>Error: {error.message}</div>}
            {!error && !isLoading && data && (
              <Flex direction="column" gap={8}>
                {data.map((d) => (
                  <Badge
                    key={d.id}
                    variant="outline"
                    color="blue"
                    size="xl"
                    radius="md"
                  >
                    {dayjs(d.checkin_date).format('MM-DD-YYYY')}
                  </Badge>
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
