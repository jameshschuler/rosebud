import { Flex, Image, Text } from '@mantine/core'
import noData from '@/assets/no-data.svg'

export function NoData() {
  return (
    <Flex direction="column" justify="center" align="center" gap={24} mt={24}>
      <Image w="35%" src={noData} />
      <Text c="dimmed">No Programs created yet</Text>
    </Flex>
  )
}
