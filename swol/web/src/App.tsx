import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Container, Flex, Title } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useState } from 'react'
import { AddCheckInModal } from './components/AddCheckInModal'
import { AppBar } from './components/AppBar'
import { CheckInsList } from './components/CheckInsList'
import { Login } from './components/Login'
import { RemoveCheckInModal } from './components/RemoveCheckInModal'
import { ResponsiveButton } from './components/ui/ResponsiveButton'
import {
  useAuth,
  useModal,
} from './hooks'

dayjs.extend(utc)

function App() {
  const { auth, user } = useAuth()

  const addModal = useModal(false)
  const removeModal = useModal(false)

  const [selectedCheckIn, setSelectedCheckIn] = useState<number>()

  const hasCheckIns = true

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
          <CheckInsList
            selectedCheckIn={selectedCheckIn}
            onClick={(id) => {
              setSelectedCheckIn(id)
            }}
          />
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
