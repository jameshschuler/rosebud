import { selectCheckInsSchema } from '@/db/schema'
import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'

export const list = createRoute({
  path: '/check-ins',
  method: 'get',
  tags: ['Check-Ins'],
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectCheckInsSchema),
      'The list of Check-Ins',
    ),
  },
})

export type ListRoute = typeof list
