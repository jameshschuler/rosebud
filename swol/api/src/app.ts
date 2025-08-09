import index from '@/routes/index.route'
import configureOpenAPI from './lib/configure-open-api'
import createApp from './lib/create-app'
import checkIns from './routes/checkIns/checkIns'
import programs from './routes/programs/programs'

const app = createApp()

app.get('/api', (c) => {
  return c.text('Hello Hono!')
})

configureOpenAPI(app)

const routes = [
  index,
  checkIns,
  programs,
] as const

routes.forEach((route) => {
  app.route('/api', route)
})

export type AppType = typeof routes[number]

export default app
