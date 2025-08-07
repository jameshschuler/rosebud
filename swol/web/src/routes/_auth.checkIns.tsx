import { createFileRoute } from '@tanstack/react-router'
import { CheckIns } from '@/features/CheckIns/components/CheckIns.tsx'

export const Route = createFileRoute('/_auth/checkIns')({
  component: CheckIns,
})
