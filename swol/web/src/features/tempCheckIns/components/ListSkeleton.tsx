import { Flex, Skeleton } from '@mantine/core'

export function ListSkeleton() {
  return (
    <Flex direction="column" gap={24}>
      {...Array.from({ length: 5 }).map((_, i) => (
        <Flex key={i} direction="column" gap={24}>
          <Skeleton height={50} radius="md" width={100} />
          <Flex wrap={'wrap'} gap={8}>
            {...Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} height={50} width={160} radius="md" />
            ))}
          </Flex>
        </Flex>
      ))}
    </Flex>
  )
}
