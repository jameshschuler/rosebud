import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/goals')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/goals"!</div>
}
