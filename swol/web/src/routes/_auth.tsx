import { Box, Flex, Stack } from '@mantine/core'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { AppBar } from '@/components/AppBar'
import { AppLink } from '@/components/AppLink'
import { Toolbar } from '@/components/Toolbar'
import { navLinks } from '@/constants'
import { useIsPhablet } from '@/hooks'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: AuthLayout,
})

function AuthLayout() {
  const isPhablet = useIsPhablet()

  return (
    <Box mih="100vh">
      <AppBar />
      <Flex mb={100} flex={1}>
        <Stack component="nav" w="20%" gap={16} px={24} display={isPhablet ? 'none' : 'flex'}>
          {navLinks.map(link => (
            <AppLink key={link.to} icon={link.icon} to={link.to} label={link.label} />
          ))}
        </Stack>
        <Box w={isPhablet ? '95%' : '80%'} mx={isPhablet ? 'auto' : ''} p={24} bg="gray.0" bdrs={16}>
          <Outlet />
        </Box>
      </Flex>
      {isPhablet && <Toolbar />}
    </Box>
  )
}
