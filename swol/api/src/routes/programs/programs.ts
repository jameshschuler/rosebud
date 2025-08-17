import { createRouter } from '@/lib/create-app'

import * as handlers from './programs.handlers'
import * as routes from './programs.routes'

const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.remove, handlers.remove)

export default router
