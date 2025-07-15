import { createTheme, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import App from './App.tsx'
import { AuthProvider } from './AuthProvider.tsx'

if ('serviceWorker' in navigator) {
  registerSW();
}

const queryClient = new QueryClient()

const theme = createTheme({
  fontFamily: 'Poppins, serif',
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Notifications />
          <App />
        </QueryClientProvider>
      </AuthProvider>
    </MantineProvider>
  </StrictMode>,
)
