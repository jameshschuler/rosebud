import type { Schema } from 'hono'
import type { AppBindings, AppOpenAPI } from './types'
import { OpenAPIHono } from '@hono/zod-openapi'
import { pinoLogger } from 'hono-pino'
import { cors } from 'hono/cors'
import { requestId } from 'hono/request-id'
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares'
import { defaultHook } from 'stoker/openapi'
import env from '@/env'

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  })
}

export default function createApp() {
  const app = createRouter()
  const clientOrigin = env.CLIENT_ORIGIN.split(',').map(s => s.trim())

  app.use('/api/*', cors({
    origin: clientOrigin,
    allowHeaders: ['Authorization', 'Content-Type'],
  }))
  app.use(requestId())
    .use(serveEmojiFavicon('🏋️'))
    .use(pinoLogger())

  app.notFound(notFound)
  app.onError(onError)

  return app
}

export function createTestApp<S extends Schema>(router: AppOpenAPI<S>) {
  return createApp().route('/', router)
}
