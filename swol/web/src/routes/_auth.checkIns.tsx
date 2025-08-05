import { CheckIns } from '@/features/CheckIns/components/Index'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/checkIns')({
    component: CheckIns,
})