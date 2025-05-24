import app from './app'
import env from './env'

const port = env.PORT

const server = Bun.serve({
  port,
  hostname: '0.0.0.0',
  fetch: app.fetch,
})

// eslint-disable-next-line no-console
console.log('server running', server.port)
