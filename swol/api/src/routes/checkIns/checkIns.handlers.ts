import type { AppRouteHandler } from '@/lib/types'
import type { ListRoute } from './checkIns.routes'
import { db } from '@/db'

// TODO: implement auth check
export const list: AppRouteHandler<ListRoute> = async (c) => {
  const rows = await db.query.gymCheckin.findMany()
  const checkIns = rows.map(row => ({
    id: row.id,
    checkInDate: row.checkinDate,
  }))

  return c.json(checkIns)
}
