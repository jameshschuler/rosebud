import {
  faArrowRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Box, Button, Flex, Image, Menu, Title } from '@mantine/core'
import swol from '../assets/SWOLa192.png'
import { useAuth } from '../hooks'

export function AppBar() {
  const { auth, user, signOut } = useAuth()

  const initials = (user?.user_metadata?.full_name ?? '')
    .split(' ')
    .map((n: string[]) => n[0])
    .join('')

  return (
    <Flex justify="space-between" align="center" p={{ base: 'md', 'xs': 'xl' }}>
      <Flex align="center" gap={16}>
        <Image src={swol} h={50} />
        <Title>Swol</Title>
      </Flex>

      {auth && user && (
        <Box>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button variant="transparent" h={40}>
                <Avatar radius="xl">{initials}</Avatar>
              </Button>
            </Menu.Target>

            {/* TODO: think about better solution for mobile (drawer?) */}
            <Menu.Dropdown>
              <Menu.Item p={12} leftSection={<FontAwesomeIcon icon={faUser} />}>
                Profile
              </Menu.Item>

              <Menu.Divider />
              <Menu.Item
                p={12}
                onClick={() => signOut()}
                leftSection={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
              >
                Sign out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Box>
      )}
    </Flex>
  )
}
