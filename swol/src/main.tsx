import { createTheme, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './AuthProvider.tsx'

const queryClient = new QueryClient()

const theme = createTheme({
  fontFamily: 'Poppins, serif',
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <Notifications />
          <App />
        </MantineProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
