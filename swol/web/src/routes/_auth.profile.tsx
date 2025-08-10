import { Grid } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { ProgramsCard } from '@/features/Programs/components/ProgramsCard'

export const Route = createFileRoute('/_auth/profile')({
  component: ProfilePage,
})

function ProfilePage() {
  return (
    <Grid>
      <Grid.Col span={{ base: 12, sm: 6 }}>
        <ProgramsCard />
      </Grid.Col>
    </Grid>
  )
}
