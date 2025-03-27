import env from '@/env'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schemaFilter: ['public'],
  schema: './src/db/schema.ts',
  out: './supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL!,
  },
})
