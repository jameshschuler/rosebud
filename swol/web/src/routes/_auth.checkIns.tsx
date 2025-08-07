import { createFileRoute } from '@tanstack/react-router'
import { CheckIns } from '@/features/tempCheckIns/components/CheckIns'

export const Route = createFileRoute('/_auth/checkIns')({
  component: CheckInsPage,
})

function CheckInsPage() {
  return (
    <CheckIns />
  )
}
