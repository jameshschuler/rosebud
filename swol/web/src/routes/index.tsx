import { createFileRoute, redirect } from '@tanstack/react-router'
import { Login } from '@/components/Login'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: '/dashboard',
      })
    }
  },
  component: Login,
})
