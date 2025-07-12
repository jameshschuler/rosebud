import { db } from '@/db'
import { activity, gymCheckin } from '@/db/schema'
import type { AppRouteHandler } from '@/lib/types'
import { and, eq, inArray } from 'drizzle-orm'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'
import type { CreateRoute, ListRoute, RemoveRoute } from './checkIns.routes'

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const user = c.get('user')
  const rows = await db.query.gymCheckin.findMany({
    where: eq(gymCheckin.userId, user!.id),
    with: {
      activity: true,
    },
  })

  const checkIns = rows.map(row => ({
    id: row.id,
    checkInDate: row.checkinDate,
    activity: row.activity,
  }))

  return c.json(checkIns)
}

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const user = c.get('user')

  const checkIn = c.req.valid('json')

  const values = checkIn.activityIds.map((id) => {
    return {
      userId: user!.id,
      checkinDate: checkIn.checkinDate,
      activityId: id,
    }
  })

  const createdCheckIns = await db.insert(gymCheckin).values(values).returning()
  const checkIns = await parseCheckIns(createdCheckIns)

  return c.json(checkIns, HttpStatusCodes.CREATED)
}

async function parseCheckIns(createdCheckIns: {
  id: number
  createdAt: string | null
  userId: string
  checkinDate: string
  activityId: number
}[]) {
  const checkIns = new Array<{
    id: number
    checkInDate: string
    activityId: number
    activity: {
      id: number
      name: string
    }
  }>()

  createdCheckIns.forEach(async (createdCheckIn) => {
    const relatedActivity = await db.query.activity.findFirst({
      where: eq(activity.id, createdCheckIn.activityId),
    })

    if (!relatedActivity) {
      throw new Error('Failed to find related activity for the check-in')
    }

    checkIns.push({
      id: createdCheckIn.id,
      checkInDate: createdCheckIn.checkinDate,
      activityId: createdCheckIn.activityId,
      activity: {
        id: relatedActivity?.id,
        name: relatedActivity?.name,
      },
    })
  })

  return checkIns
}

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const user = c.get('user')
  const { ids } = c.req.valid('query')

  const idsToDelete = ids.split(',').map(id => parseInt(id, 10))

  const result = await db.delete(gymCheckin)
    .where(and(
      inArray(gymCheckin.id, idsToDelete),
      eq(gymCheckin.userId, user!.id),
    ));

  if (result.count === 0) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    )
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT)
}
