import type { CreateRoute, ListRoute } from './programs.routes'
import type { AppRouteHandler } from '@/lib/types'
import { and, count, desc, eq, ilike } from 'drizzle-orm'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { db } from '@/db'
import { programs } from '@/db/schema'

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const { name, author, programType } = c.req.valid('query')
  const user = c.get('user')

  const conditions = [
    eq(programs.userId, user!.id),
  ]

  if (name) {
    conditions.push(ilike(programs.name, `%${name}%`))
  }

  if (author) {
    conditions.push(ilike(programs.author, `%${author}%`))
  }

  if (programType) {
    conditions.push(eq(programs.programType, programType))
  }

  const rows = await db.query.programs.findMany({
    where: and(...conditions),
    orderBy: [desc(programs.createdAt)],
  })

  const response = {
    programs: rows,
    currentPrograms: {},
  }

  const activePrograms = await db.query.programs.findMany({
    where: and(
      eq(programs.userId, user!.id),
      eq(programs.active, true),
    ),
  })

  if (activePrograms.length !== 0) {
    const currentPrograms = activePrograms.reduce((acc, program) => {
      acc[program.programType] = {
        type: program.programType,
        name: program.name,
        id: program.id,
      }
      return acc
    }, {} as Record<string, { type: string, name: string, id: number }>)

    response.currentPrograms = currentPrograms
  }

  return c.json(response)
}

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const user = c.get('user')

  const programsCount = await db.select({ count: count() })
    .from(programs)
    .where(eq(programs.userId, user!.id))

  if (programsCount[0].count >= 100) {
    return c.json(
      { error: { issues: [], name: 'ProgramLimitExceeded' }, success: false },
      HttpStatusCodes.UNPROCESSABLE_ENTITY,
    )
  }

  const program = c.req.valid('json')

  const values = {
    userId: user!.id,
    name: program.name,
    description: program.description,
    author: program.author,
    active: program.active || false,
    programType: program.programType,
  }

  // Deactivate all other programs of the same type
  if (program.active) {
    await db.update(programs)
      .set({ active: false })
      .where(
        and(
          eq(programs.userId, user!.id),
          eq(programs.programType, program.programType),
        ),
      )
  }

  const createdProgram = await db.insert(programs).values(values).returning()

  return c.json(createdProgram.at(0), HttpStatusCodes.CREATED)
}
