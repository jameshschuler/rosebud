import { createTheme, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, ErrorComponent, RouterProvider } from '@tanstack/react-router'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import { AuthProvider } from './AuthProvider.tsx'
import { useAuth } from './hooks/index.ts'
import { routeTree } from './routeTree.gen'

dayjs.extend(utc)
dayjs.extend(customParseFormat)

const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
    // TODO:
    <div className={`p-2 text-2xl`}>
      {/* <Spinner /> */}
      Loading...
    </div>
  ),
  // TODO:
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultPreloadStaleTime: 0,
  context: {
    auth: undefined!,
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

if ('serviceWorker' in navigator) {
  registerSW();
}

const theme = createTheme({
  fontFamily: 'Poppins, serif',
})

function InnerApp() {
  const auth = useAuth()
  return (
    <RouterProvider router={router} context={{ auth }}></RouterProvider>
  )
}

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <InnerApp />
      </QueryClientProvider>
    </AuthProvider>
  )
}

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </StrictMode>,
)
