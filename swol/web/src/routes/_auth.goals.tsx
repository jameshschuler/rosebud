import { Box } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { ComingSoon } from '@/components/ComingSoon'

export const Route = createFileRoute('/_auth/goals')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Box>
      <ComingSoon />
    </Box>
  )
}
