import { Button, Flex, Image, Title } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import construction from '../assets/construction.svg'

export function ComingSoon() {
  return (
    <Flex direction="column" justify="center" gap={50} mt={40} mx="auto" maw={600}>
      <Flex justify="center">
        <Image
          w={300}
          src={construction}
          alt="Under construction sign"
        />
      </Flex>
      <Flex justify="center" direction="column" gap={24}>
        <Title ta="center">Great things coming soon.</Title>
        <Button size="lg" component={Link} href="/dashboard" style={{ alignSelf: 'center' }}>
          Back to Dashboard
        </Button>
      </Flex>
    </Flex>
  )
}
