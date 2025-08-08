import { Box, Button, Flex, Image, Title } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import notFound from '@/assets/not-found.png'
import { AppBar } from './AppBar'

export function NotFound() {
  return (
    <Box mih="100vh">
      <AppBar />
      <Flex direction="column" justify="center" gap={50} mt={40} mx="auto" maw={600}>
        <Flex justify="center">
          <Image
            w={300}
            src={notFound}
            alt="Angry lost monster"
          />
        </Flex>
        <Flex justify="center" direction="column" gap={24}>
          <Title ta="center">Stray from the gym?</Title>
          <Button size="lg" color="red" component={Link} href="/" style={{ alignSelf: 'center' }}>
            Run Away
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}
