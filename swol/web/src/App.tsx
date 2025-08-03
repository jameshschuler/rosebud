// import { Box, Container } from '@mantine/core'
// import '@mantine/core/styles.css'
// import '@mantine/dates/styles.css'
// import '@mantine/notifications/styles.css'
// import dayjs from 'dayjs'
// import customParseFormat from 'dayjs/plugin/customParseFormat'
// import utc from 'dayjs/plugin/utc'
// import { AppBar } from './components/AppBar'
// import { CheckIns } from './components/CheckIns/CheckIns'
// import { Login } from './components/Login'
// import {
//   useAuth
// } from './hooks'
// import { useIsMobile } from './hooks/useIsMobile'

// dayjs.extend(utc)
// dayjs.extend(customParseFormat)

// function App() {
//   const { auth, user } = useAuth()
//   const isMobile = useIsMobile()

//   if (!auth || !user) {
//     return <Login />
//   }

//   return (
//     <>
//       <Box>
//         <AppBar />
//         <Container size={isMobile ? 'responsive' : 'lg'} py="xl">
//           <CheckIns />
//         </Container>
//       </Box>
//     </>
//   )
// }

// export default App
