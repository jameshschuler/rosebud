import { Skeleton, Stack } from '@mantine/core'

export function ListSkeleton() {
  return (
    <Stack gap={8}>
      <Skeleton height={50} radius="md" />
      <Skeleton height={50} radius="md" />
      <Skeleton height={50} radius="md" />
      <Skeleton height={50} radius="md" />
    </Stack>
  )
}
