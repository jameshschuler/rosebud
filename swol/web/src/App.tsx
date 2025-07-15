import { Box, Container } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import { useMediaQuery } from '@mantine/hooks'
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
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (!auth || !user) {
    return <Login />
  }

  return (
    <>
      <Box>
        <AppBar />
        <Container size={isMobile ? 'responsive' : 'lg'} py="xl">
          <CheckIns />
        </Container>
      </Box>
    </>
  )
}

export default App
