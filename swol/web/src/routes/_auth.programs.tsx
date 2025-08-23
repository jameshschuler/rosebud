import { createFileRoute } from '@tanstack/react-router'
import { ProgramsTable } from '@/features/Programs/components/ProgramsTable'

export const Route = createFileRoute('/_auth/programs')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ProgramsTable />
  )
}
