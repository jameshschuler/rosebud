import index from '@/routes/index.route'
import configureOpenAPI from './lib/configure-open-api'
import createApp from './lib/create-app'

const app = createApp()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

configureOpenAPI(app)

const routes = [
  index,
//  tasks,
] as const

routes.forEach((route) => {
  app.route('/', route)
})

export type AppType = typeof routes[number]

export default app
