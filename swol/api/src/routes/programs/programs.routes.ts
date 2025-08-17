import { createRoute } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema, IdParamsSchema } from 'stoker/openapi/schemas'
import { insertProgramsSchema, selectProgramsSchema } from '@/db/schemas/programs.schemas'
import { authMiddleware } from '@/middlewares/auth'
import { listProgramsQuerySchema, listProgramsResponseSchema } from './lib'
import { IdsParamsSchema } from '../checkIns/lib'
import { notFoundSchema } from '@/lib/constants'

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

export const remove = createRoute({
  path: '/programs',
  method: 'delete',
  request: {
    query: IdParamsSchema,
  },
  tags,
  middleware: [authMiddleware] as const,
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: 'Program deleted',
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'Program not found',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdsParamsSchema),
      'Invalid id error',
    ),
  },
})

export type RemoveRoute = typeof remove
export type ListRoute = typeof list
export type CreateRoute = typeof create
