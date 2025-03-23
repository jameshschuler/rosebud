import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Container, Divider, Flex, Title } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useState } from 'react'
import { AddCheckInModal } from './components/AddCheckInModal'
import { AppBar } from './components/AppBar'
import { ListSkeleton } from './components/ListSkeleton'
import { Login } from './components/Login'
import { NoData } from './components/NoData'
import { RemoveCheckInModal } from './components/RemoveCheckInModal'
import { ResponsiveButton } from './components/ui/ResponsiveButton'
import {
  useAuth,
  useGetCheckIns,
  useModal,
  useTransformCheckIns,
} from './hooks'

dayjs.extend(utc)

function App() {
  const { auth, user } = useAuth()

  const addModal = useModal(false)
  const removeModal = useModal(false)

  const { data, error, isLoading: loadingCheckIns } = useGetCheckIns(user?.id)

  const { checkIns, hasCheckIns } = useTransformCheckIns(data)

  const [selectedCheckIn, setSelectedCheckIn] = useState<number>()

  if (!auth || !user) {
    return <Login />
  }

  return (
    <>
      <Box p="xl">
        <AppBar />
        <Container size="lg" py="xl">
          {/* TODO: PageHeader */}
          <Flex justify="space-between" align="center" mt="xl">
            <Title>Your Check Ins</Title>
            <Flex gap={8} align="center">
              {selectedCheckIn && (
                <ResponsiveButton
                  color="red"
                  icon={<FontAwesomeIcon icon={faTrashCan} size="lg" />}
                  onClick={removeModal.open}
                  label="Remove Check In"
                />
              )}
              {hasCheckIns && (
                <ResponsiveButton
                  icon={<FontAwesomeIcon icon={faPlus} size="lg" />}
                  onClick={addModal.open}
                  label="New Check In"
                />
              )}
            </Flex>
          </Flex>
          <Box py="xl">
            {/* TODO: CheckInsList? */}
            {loadingCheckIns && <ListSkeleton />}
            {error && <div>Error: {error.message}</div>}
            {!error && !loadingCheckIns && data && (
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
                            {data.map((d) => (
                              <Button
                                style={{
                                  boxShadow: `4px 4px 0px ${selectedCheckIn === d.id ? 'var(--mantine-color-yellow-6)' : 'black'}`,
                                }}
                                onClick={() => {
                                  if (selectedCheckIn === d.id) {
                                    setSelectedCheckIn(undefined)
                                  } else {
                                    setSelectedCheckIn(d.id)
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
        </Container>
      </Box>
      <AddCheckInModal opened={addModal.opened} close={addModal.close} />
      <RemoveCheckInModal
        selectedCheckIn={selectedCheckIn}
        opened={removeModal.opened}
        close={() => {
          setSelectedCheckIn(undefined)

          removeModal.close()
        }}
      />
    </>
  )
}

export default App
