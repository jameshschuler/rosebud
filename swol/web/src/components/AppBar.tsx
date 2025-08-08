import {
  faArrowRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionIcon, Avatar, Box, Button, Flex, Image, Menu, Title, VisuallyHidden } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useNavigate } from '@tanstack/react-router'
import { useMemo } from 'react'
import swol from '../assets/SWOLa192.png'
import { useAuth, useIsMobile, useIsPhablet, useIsTablet } from '../hooks'
import { AccountDrawer } from './AccountDrawer'

export function AppBar() {
  const { isAuthenticated, user, signOut } = useAuth()
  const navigate = useNavigate()

  const [opened, { open, close }] = useDisclosure(false)
  const isPhablet = useIsPhablet()

  const initials = (user?.user_metadata?.full_name ?? '')
    .split(' ')
    .map((n: string[]) => n[0])
    .join('')

  const username = useMemo(() => user?.user_metadata?.preferred_username
    ?? user?.user_metadata?.user_name
    ?? user?.user_metadata?.full_name
    ?? '', [user?.user_metadata?.full_name, user?.user_metadata?.preferred_username, user?.user_metadata?.user_name])

  return (
    <>
      <Flex justify="space-between" align="center" p={{ base: 'md', xs: 'xl' }}>
        <Flex align="center" gap={16}>
          <Image src={swol} h={50} w={50} />
          <Title>Swol</Title>
        </Flex>

        {isAuthenticated && user && (
          <Box>
            {isPhablet
              ? (
                  <Button variant="transparent" h={40} onClick={open}>
                    <Avatar src={user?.user_metadata?.avatar_url} alt={username} radius="xl">{initials}</Avatar>
                  </Button>
                )
              : (

                  <Menu shadow="md" width={200}>
                    <Menu.Target>
                      <Button variant="transparent" h={40}>
                        <Avatar radius="xl">{initials}</Avatar>
                      </Button>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Item p={12} leftSection={<FontAwesomeIcon icon={faUser} />}>
                        Profile
                      </Menu.Item>

                      <Menu.Divider />
                      <Menu.Item
                        p={12}
                        onClick={async () => {
                          await signOut()
                          navigate({ to: '/' })
                        }}
                        leftSection={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
                      >
                        Sign out
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                )}

          </Box>
        )}
      </Flex>
      <AccountDrawer username={username} opened={opened} close={close} />
    </>
  )
}
