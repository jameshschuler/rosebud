import type { PinoLogger } from 'hono-pino'

export interface AppBindings {
  Variables: {
    Logger: PinoLogger
  }
}
