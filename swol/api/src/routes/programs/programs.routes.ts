import { createRoute } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema, createMessageObjectSchema, IdParamsSchema } from 'stoker/openapi/schemas'
import { getOneProgramSchema, insertProgramsSchema, patchProgramsSchema } from '@/db/schemas/programs.schemas'
import { notFoundSchema } from '@/lib/constants'
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

export const getOne = createRoute({
  path: '/programs/{id}',
  method: 'get',
  tags,
  middleware: [authMiddleware] as const,
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getOneProgramSchema,
      'The requested program',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid id error',
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'Program not found',
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
      getOneProgramSchema,
      'The created program',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertProgramsSchema),
      'The validation errors(s)',
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      createMessageObjectSchema('Internal server error'),
      'Internal server error',
    ),
  },
})

export const remove = createRoute({
  path: '/programs/{id}',
  method: 'delete',
  request: {
    params: IdParamsSchema,
  },
  tags,
  middleware: [authMiddleware] as const,
  responses: {
    [HttpStatusCodes.OK]: {
      description: 'Program deleted',
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'Program not found',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid id error',
    ),
  },
})

export const patch = createRoute({
  path: '/programs/{id}',
  method: 'patch',
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(patchProgramsSchema, 'The program to patch'),
  },
  tags,
  middleware: [authMiddleware] as const,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getOneProgramSchema,
      'The patched program',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(patchProgramsSchema).or(createErrorSchema(IdParamsSchema)),
      'The validation errors(s)',
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'Program not found',
    ),
  },
})

export type ListRoute = typeof list
export type CreateRoute = typeof create
export type RemoveRoute = typeof remove
export type GetOneRoute = typeof getOne
export type PatchRoute = typeof patch
