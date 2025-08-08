import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  ActionIcon,
  Box,
  Container,
  Flex,
  Image,
  Text,
  Title,
  VisuallyHidden,
} from '@mantine/core'
import landing from '../assets/landing.svg'
import { useAuth } from '../hooks'
import { AppBar } from './AppBar'

// Welcome to Swol – Stay Consistent, Stay Swole!

// TODO:
// Every rep, every set, every visit—you're making progress. Check in, log your PRs, and keep crushing your goals. Let’s get stronger together!

// TODO: landing page design
export function Login() {
  const { signIn } = useAuth()

  return (
    <Box p="xl">
      <AppBar />
      <Container size="xl" py="xl" px={{ base: 0, md: 24 }}>
        <Flex
          justify="center"
          direction={{
            base: 'column-reverse',
            lg: 'row',
          }}
          style={{ height: '100vh' }}
          mt={{ base: '10%' }}
          gap={{ base: 56, lg: 0 }}
        >
          <Box flex={2} p={{ base: 0, md: 24 }}>
            <Image radius="md" h="auto" src={landing} />
          </Box>
          <Flex
            flex={{ base: 0, lg: 1 }}
            p={{ base: 0, md: 24 }}
            direction="column"
          >
            <Title order={1} size={48} fw={500}>
              Welcome to Swol!
            </Title>
            <Text fw={500} size="lg">
              Every check-in is a step forward
            </Text>

            <Text mt={48} size="sm">
              Join now or sign back in using one of the options below
            </Text>

            <Flex direction="row" gap={16} mt={16}>
              <ActionIcon
                size={48}
                radius="xl"
                variant="outline"
                color="black"
                onClick={() => signIn('github')}
              >
                <FontAwesomeIcon icon={faGithub} size="2xl" />
                <VisuallyHidden>Github</VisuallyHidden>
              </ActionIcon>
              <ActionIcon size={48} radius="xl" variant="outline" color="black" onClick={() => signIn('google')}>
                <FontAwesomeIcon icon={faGoogle} size="2xl" />
                <VisuallyHidden>Google</VisuallyHidden>
              </ActionIcon>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
