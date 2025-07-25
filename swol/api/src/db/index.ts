import env from '@/env'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as relations from './relations'
import * as schema from './schema'

const client = postgres(env.DATABASE_URL, {
  prepare: false
})
export const db = drizzle({
  client, schema: {
    ...schema,
    ...relations,
  }
})
