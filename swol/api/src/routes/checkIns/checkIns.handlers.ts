import type { CreateRoute, ListRoute, RemoveRoute } from './checkIns.routes'
import type { AppRouteHandler } from '@/lib/types'
import { and, eq, sql } from 'drizzle-orm'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'
import { xid } from 'zod'
import { db } from '@/db'
import { activity, gymCheckin, programs } from '@/db/schema'

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const user = c.get('user')
  const { year, month } = c.req.valid('query')

  const whereConditions = []

  if (year) {
    whereConditions.push(eq(sql`EXTRACT(YEAR FROM ${gymCheckin.checkinDate})`, year))

    if (month) {
      const [startMonth, endMonth] = month.split('-').map(m => Number.parseInt(m, 10))
      if (endMonth) {
        whereConditions.push(sql`${sql`EXTRACT(MONTH FROM ${gymCheckin.checkinDate})`} BETWEEN ${startMonth} AND ${endMonth}`)
      }
      else {
        whereConditions.push(eq(sql`EXTRACT(MONTH FROM ${gymCheckin.checkinDate})`, startMonth))
      }
    }
  }

  const rows = await db.query.gymCheckin.findMany({
    where: and(eq(gymCheckin.userId, user!.id), ...whereConditions),
    columns: {
      id: true,
      checkinDate: true,
    },
    with: {
      activity: {
        columns: {
          id: true,
          name: true,
        },
      },
      program: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
  })

  return c.json(rows)
}

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const user = c.get('user')

  const checkIn = c.req.valid('json')

  const relatedActivity = await db.query.activity.findFirst({
    where: eq(activity.id, checkIn.activityId),
  })

  if (!relatedActivity) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    )
  }

  if (checkIn.programId) {
    const relatedProgram = await db.query.programs.findFirst({
      where: eq(programs.id, checkIn.programId),
    })

    if (!relatedProgram) {
      return c.json(
        {
          message: HttpStatusPhrases.NOT_FOUND,
        },
        HttpStatusCodes.NOT_FOUND,
      )
    }
  }

  const [createdCheckIn] = await db.insert(gymCheckin).values({
    userId: user!.id,
    checkinDate: checkIn.checkinDate,
    activityId: checkIn.activityId,
    notes: checkIn.notes,
    programId: checkIn.programId,
  }).returning({
    id: gymCheckin.id,
    checkinDate: gymCheckin.checkinDate,
    activityId: gymCheckin.activityId,
    notes: gymCheckin.notes,
    programId: gymCheckin.programId,
  })

  return c.json(createdCheckIn, HttpStatusCodes.CREATED)
}

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const user = c.get('user')
  const { id } = c.req.valid('param')

  const result = await db.delete(gymCheckin)
    .where(and(
      eq(gymCheckin.id, id),
      eq(gymCheckin.userId, user!.id),
    ))

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
