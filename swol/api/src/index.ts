import { serve } from '@hono/node-server'
import app from './app'
import env from './env'

const port = env.PORT

serve(
  {
    fetch: app.fetch,
    port,
  },
)
