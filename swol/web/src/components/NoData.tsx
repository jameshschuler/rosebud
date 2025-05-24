import { Button, Flex, Image, Text } from '@mantine/core'
import noDataYet from '../assets/energizer.svg'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'

interface NoDataProps {
  onAction: () => void
}

export function NoData({ onAction }: NoDataProps) {
  return (
    <Flex direction="column" justify="center" align="center" gap={32} mt={56}>
      <Image radius="md" h="auto" w={300} src={noDataYet} />
      <Text size="lg" fw={600}>
        Looks like you haven't checked into the gym yet.
      </Text>
      <Button variant="filled" color="yellow" size="lg" onClick={onAction}>
        Check In Now
      </Button>
    </Flex>
  )
}
