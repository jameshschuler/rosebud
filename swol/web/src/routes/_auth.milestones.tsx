import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/milestones')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/milestones"!</div>
}
