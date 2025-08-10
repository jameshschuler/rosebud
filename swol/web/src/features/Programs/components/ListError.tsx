import { Button, Flex, Image, Text } from '@mantine/core'
import towing from '@/assets/towing.svg'
import { SWOL_GREEN } from '@/theme'

export function ListError() {
  return (
    <Flex direction="column" justify="center" align="center" gap={24} mt={24}>
      <Image w="45%" src={towing} />
      <Text c="dimmed">An error occurred while fetching programs.</Text>
      <Button
        onClick={() => {
        // TODO:
        }}
        color={SWOL_GREEN}
      >Retry
      </Button>
    </Flex>
  )
}
