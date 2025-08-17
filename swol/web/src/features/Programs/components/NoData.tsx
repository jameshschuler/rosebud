import { Flex, Image, Text } from '@mantine/core'
import noData from '@/assets/no-data.svg'

interface NoDataProps {
  searchQuery?: string
}

export function NoData({ searchQuery }: NoDataProps) {
  return (
    <Flex direction="column" justify="center" align="center" gap={24} mt={24}>
      <Image w="35%" src={noData} />
      <Text c="dimmed">{searchQuery ? `No Programs found matching search '${searchQuery}'` : 'No Programs created yet'}</Text>
    </Flex>
  )
}
