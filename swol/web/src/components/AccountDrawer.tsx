import { faArrowRightFromBracket, faCircleXmark, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Divider, Drawer, Flex, Stack, Text } from '@mantine/core'
import { useIsMobile } from '@/hooks'
import { AppLink } from './AppLink'

// TODO: move achievements here
// TODO: maybe goals as well
const navLinks = [
  {
    to: '/profile',
    label: 'My Profile',
    icon: faUser,
    activeIcon: faUser,
  },
]

interface AccountDrawerProps {
  opened: boolean
  close: () => void
  username: string
  onSignOut: () => Promise<void>
}

export function AccountDrawer({ opened, close, username, onSignOut }: AccountDrawerProps) {
  const isMobile = useIsMobile()

  return (
    <Drawer.Root opened={opened} onClose={close} position="right" size={isMobile ? '100%' : 'lg'}>
      <Drawer.Overlay />
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>
            <Text size="xl" fw={600}>
              Hello,
              {' '}
              {username}
              !
            </Text>
          </Drawer.Title>
          <Drawer.CloseButton icon={<FontAwesomeIcon icon={faCircleXmark} size="xl" />} />
        </Drawer.Header>
        <Divider mb="md" mx="md" />
        <Drawer.Body px={8} pb={0} h="90%">
          <Flex direction="column" justify="space-between" h="100%">
            <Stack component="nav" gap={16}>
              {navLinks.map(link => (
                <AppLink onClick={close} key={link.to} link={link} />
              ))}
            </Stack>
            <Box mb={12}>
              <Divider mb="xs" />
              <Button
                px={12}
                variant="transparent"
                rightSection={(
                  <Box ml={8}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                  </Box>
                )}
                color="red"
                size="lg"
                onClick={onSignOut}
              >
                Sign out
              </Button>
            </Box>
          </Flex>

        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  )
}
