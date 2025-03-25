import type { AppRouteHandler } from '@/lib/types'
import type { ListRoute } from './checkIns.routes'

export const list: AppRouteHandler<ListRoute> = (c) => {
  return c.json([
    { name: 'Check-In 1' },
    { name: 'Check-In 2' },
  ])
}
