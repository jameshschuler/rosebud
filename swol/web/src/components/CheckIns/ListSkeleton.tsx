import { Flex, Skeleton } from '@mantine/core'

export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <Flex direction="column" gap={24}>
      <Skeleton height={50} radius="md" width={100} />
      <Flex wrap={'wrap'} gap={8}>
        {...Array.from({ length: count }).map((_, i) => (
          <Skeleton key={i} height={50} width={160} radius="md" />
        ))}
      </Flex>
      <Skeleton height={50} radius="md" width={100} />
      <Flex wrap={'wrap'} gap={8}>
        {...Array.from({ length: count }).map((_, i) => (
          <Skeleton key={i} height={50} width={160} radius="md" />
        ))}
      </Flex>
    </Flex>
  )
}
