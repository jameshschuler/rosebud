import { insertCheckInsSchema, selectCheckInsSchema } from '@/db/schema'
import { notFoundSchema } from '@/lib/constants'
import { authMiddleware } from '@/middlewares/auth'
import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema, IdParamsSchema } from 'stoker/openapi/schemas'

const tags = ['Check-Ins']

export const list = createRoute({
  path: '/check-ins',
  method: 'get',
  tags,
  middleware: [authMiddleware] as const,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectCheckInsSchema),
      'The list of check-ins',
    ),
    // TODO: currently middleware response types aren't getting passed through
    // [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
    //   z.object({ error: z.string() }),
    //   'Unauthorized',
    // ),
  },
})

export const create = createRoute({
  path: '/check-ins',
  method: 'post',
  request: {
    body: jsonContentRequired(insertCheckInsSchema, "The check-in to create"),
  },
  tags,
  middleware: [authMiddleware] as const,
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      selectCheckInsSchema,
      'The created check-in',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertCheckInsSchema),
      'The validation errors(s)',
    ),
  },
})

export const remove = createRoute({
  path: "/check-ins/{id}",
  method: "delete",
  request: {
    params: IdParamsSchema,
  },
  tags,
  middleware: [authMiddleware] as const,
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "Check-in deleted",
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Check-in not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export type ListRoute = typeof list
export type CreateRoute = typeof create
export type RemoveRoute = typeof remove
