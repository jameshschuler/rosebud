import { sql } from 'drizzle-orm'
import { bigint, boolean, foreignKey, pgPolicy, pgSchema, pgTable, text, timestamp, unique, uuid, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import z from 'zod'

const authSchema = pgSchema('auth')

export const users = authSchema.table('users', {
  id: uuid('id').primaryKey(),
})

export const activity = pgTable('activity', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint({ mode: 'number' }).primaryKey().generatedByDefaultAsIdentity({ name: 'activity_id_seq', startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  name: text().notNull(),
}, () => [
  pgPolicy('Enable select for users based on user_id', { as: 'permissive', for: 'select', to: ['authenticated'] }),
])

export const gymCheckin = pgTable('gym_checkin', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint({ mode: 'number' }).primaryKey().generatedByDefaultAsIdentity({ name: 'gym_checkin_id_seq', startWith: 1, increment: 1, minValue: 1, maxValue: '9223372036854775807', cache: 1 }),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow(),
  userId: uuid('user_id').notNull(),
  checkinDate: timestamp('checkin_date', { withTimezone: true, mode: 'string' }).notNull(),
  activityId: bigint('activity_id', { mode: 'number' }).default(sql`'1'`).notNull(),
}, table => [
  foreignKey({
    columns: [table.userId],
    foreignColumns: [users.id],
    name: 'gym_checkin_user_id_fkey',
  }),
  foreignKey({
    columns: [table.activityId],
    foreignColumns: [activity.id],
    name: 'gym_checkin_activity_id_fkey',
  }),
  pgPolicy('Enable update for users based on user_id', { as: 'permissive', for: 'update', to: ['authenticated'], using: sql`(auth.uid() = user_id)` }),
  pgPolicy('Enable select for users based on user_id', { as: 'permissive', for: 'select', to: ['authenticated'] }),
  pgPolicy('Enable insert for authenticated users only', { as: 'permissive', for: 'insert', to: ['authenticated'] }),
  pgPolicy('Enable delete for users based on user_id', { as: 'permissive', for: 'delete', to: ['authenticated'] }),
])

export const userProfile = pgTable('user_profile', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint({ mode: 'number' }).primaryKey().generatedByDefaultAsIdentity({ name: 'user_profile_id_seq', startWith: 1, increment: 1, minValue: 1, maxValue: '9223372036854775807', cache: 1 }),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow(),
  userId: uuid('user_id').notNull(),
  email: varchar().notNull(),
  fullName: varchar('full_name'),
  avatarUrl: varchar('avatar_url'),
  pictureUrl: varchar('picture_url'),
  username: varchar(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' }),
  syncedProfile: boolean('synced_profile').default(false).notNull(),
}, table => [
  foreignKey({
    columns: [table.userId],
    foreignColumns: [users.id],
    name: 'user_profile_user_id_fkey',
  }),
  unique('user_profile_user_id_key').on(table.userId),
  unique('user_profile_email_key').on(table.email),
  pgPolicy('Enable update for users based on user_id', { as: 'permissive', for: 'update', to: ['authenticated'], using: sql`(auth.uid() = user_id)` }),
  pgPolicy('Enable select for users based on user_id', { as: 'permissive', for: 'select', to: ['authenticated'] }),
  pgPolicy('Disable delete', { as: 'permissive', for: 'delete', to: ['public'] }),
])

export const selectCheckInsSchema = createSelectSchema(gymCheckin)
  .extend({
    activity: z.object({
      id: z.number(),
      name: z.string(),
    }),
  })
  .pick({
    id: true,
    checkinDate: true,
    activity: true,
  })
  .transform((data) => {
    return {
      id: data.id,
      checkInDate: data.checkinDate,
      activity: data.activity,
    }
  })

export const insertCheckInsSchema = createInsertSchema(gymCheckin, {
  checkinDate: schema => schema
    .refine((value) => {
      // Regex that only accepts UTC timezone (Z or +00:00)
      const utcDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|\+00:00)$/

      if (!utcDateTimeRegex.test(value)) {
        return false
      }

      try {
        const date = new Date(value)
        return !Number.isNaN(date.getTime())
      }
      catch (e) {
        return false
      }
    }, 'Please enter a valid UTC date and time in the format: YYYY-MM-DDThh:mm:ssZ or YYYY-MM-DDThh:mm:ss+00:00 (example: 2025-04-01T01:01:40Z)'),
})
  .extend({
    activityIds: z.array(z.number()).min(1, 'At least one activity must be selected.'),
  })
  .required({
    checkinDate: true,
    activityIds: true,
  })
  .omit({
    id: true,
    createdAt: true,
    userId: true,
  })
