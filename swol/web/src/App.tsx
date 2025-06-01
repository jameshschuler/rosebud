import { Box, Container } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { AppBar } from './components/AppBar'
import { CheckIns } from './components/CheckIns/CheckIns'
import { Login } from './components/Login'
import {
  useAuth
} from './hooks'

dayjs.extend(utc)

function App() {
  const { auth, user } = useAuth()

  if (!auth || !user) {
    return <Login />
  }

  return (
    <>
      <Box p="xl">
        <AppBar />
        <Container size="lg" py="xl">
          <CheckIns />
        </Container>
      </Box>
    </>
  )
}

export default App
