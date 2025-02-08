import { Flex, Skeleton } from '@mantine/core'

export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <Flex direction="column" gap={8}>
      {[...Array(count)].map((_, i) => (
        <Skeleton key={i} height={50} radius="md" />
      ))}
    </Flex>
  )
}
