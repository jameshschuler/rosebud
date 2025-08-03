import { Login } from '@/components/Login'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    beforeLoad: ({ context }) => {
        if (context.auth.isAuthenticated) {
            throw redirect({
                to: '/dashboard'
            })
        }
    },
    component: Login,
})