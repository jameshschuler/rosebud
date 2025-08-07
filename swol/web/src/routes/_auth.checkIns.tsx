import { createFileRoute } from '@tanstack/react-router'
import { CheckIns } from '../features/CheckIns/components/CheckIns'

export const Route = createFileRoute('/_auth/checkIns')({
  component: CheckIns,
})
