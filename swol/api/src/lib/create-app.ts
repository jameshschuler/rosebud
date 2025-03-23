import type { AppBindings } from './types'
import { OpenAPIHono } from '@hono/zod-openapi'
import { pinoLogger } from 'hono-pino'
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares'

export default function createApp(): OpenAPIHono<AppBindings> {
  const app = new OpenAPIHono<AppBindings>({
    strict: false,
  })

  app.use(serveEmojiFavicon('🏋️'))
  app.use(pinoLogger())

  app.notFound(notFound)
  app.onError(onError)

  return app
}
