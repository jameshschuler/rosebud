import { CheckIns } from '@/features/CheckIns/components/CheckIns'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/checkIns')({
    component: CheckIns,
})