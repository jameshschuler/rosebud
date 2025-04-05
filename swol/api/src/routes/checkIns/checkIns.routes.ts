import { selectCheckInsSchema } from '@/db/schema'
import { authMiddleware } from '@/middlewares/auth'
import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'

export const list = createRoute({
  path: '/check-ins',
  method: 'get',
  tags: ['Check-Ins'],
  middleware: [authMiddleware] as const,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectCheckInsSchema),
      'The list of Check-Ins',
    ),
    // TODO: currently middleware response types aren't getting passed through
    // [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
    //   z.object({ error: z.string() }),
    //   'Unauthorized',
    // ),
  },
})

export type ListRoute = typeof list
