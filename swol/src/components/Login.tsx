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
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import landing from '../assets/landing.svg'
import { useAuth } from '../hooks'
import { AppBar } from './AppBar'

export function Login() {
  const { signIn } = useAuth()

  return (
    <Box p="xl">
      <AppBar />
      <Container size="xl" py="xl">
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
          <Box flex={2} p={24}>
            <Image radius="md" h="auto" src={landing} />
          </Box>
          <Flex
            flex={{ base: 0, lg: 1 }}
            p={24}
            direction="column"
            align={{ base: 'center', lg: 'normal' }}
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
                onClick={signIn}
              >
                <FontAwesomeIcon icon={faGithub} size="2xl" />
                <VisuallyHidden>Github</VisuallyHidden>
              </ActionIcon>
              <ActionIcon size={48} radius="xl" variant="outline" color="black">
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
