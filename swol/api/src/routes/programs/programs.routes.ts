import { createRoute } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema } from 'stoker/openapi/schemas'
import { insertProgramsSchema, selectProgramsSchema } from '@/db/schemas/programs.schemas'
import { authMiddleware } from '@/middlewares/auth'
import { listProgramsQuerySchema, listProgramsResponseSchema } from './lib'

const tags = ['Programs']

export const list = createRoute({
  path: '/programs',
  method: 'get',
  tags,
  middleware: [authMiddleware] as const,
  request: {
    query: listProgramsQuerySchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      listProgramsResponseSchema,
      'The list of programs',
    ),
  },
})

export const create = createRoute({
  path: '/programs',
  method: 'post',
  request: {
    body: jsonContentRequired(insertProgramsSchema, 'The program to create'),
  },
  tags,
  middleware: [authMiddleware] as const,
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      selectProgramsSchema,
      'The created program',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertProgramsSchema),
      'The validation errors(s)',
    ),
  },
})

export type ListRoute = typeof list
export type CreateRoute = typeof create
