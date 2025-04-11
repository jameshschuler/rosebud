import { db } from '@/db'
import { gymCheckin } from '@/db/schema'
import type { AppRouteHandler } from '@/lib/types'
import { and, eq } from 'drizzle-orm'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'
import type { CreateRoute, ListRoute, RemoveRoute } from './checkIns.routes'

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const user = c.get('user')
  const rows = await db.query.gymCheckin.findMany({
    where: eq(gymCheckin.userId, user!.id)
  })

  const checkIns = rows.map(row => ({
    id: row.id,
    checkInDate: row.checkinDate,
  }))

  return c.json(checkIns)
}

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const user = c.get('user')
  
  const checkIn = c.req.valid('json')
  
  const [createdCheckIn] = await db.insert(gymCheckin).values({
    userId: user!.id,
    checkinDate: checkIn.checkinDate,
  }).returning()
    
  return c.json({
    id: createdCheckIn.id,
    checkInDate: createdCheckIn.checkinDate,
  }, HttpStatusCodes.CREATED)
}

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const user = c.get('user')
  const { id } = c.req.valid("param");
  
  const result = await db.delete(gymCheckin)
    .where(and(
      eq(gymCheckin.id, id),
      eq(gymCheckin.userId, user!.id)
    ));
  
  if (result.count === 0) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};