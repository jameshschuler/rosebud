import { sql } from 'drizzle-orm'
import { bigint, boolean, foreignKey, pgPolicy, pgTable, timestamp, unique, uuid, varchar } from 'drizzle-orm/pg-core'

export const gymCheckin = pgTable('gym_checkin', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint({ mode: 'number' }).primaryKey().generatedByDefaultAsIdentity({ name: 'gym_checkin_id_seq', startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow(),
  userId: uuid('user_id').notNull(),
  checkinDate: timestamp('checkin_date', { withTimezone: true, mode: 'string' }).notNull(),
}, table => [
  foreignKey({
    columns: [table.userId],
    foreignColumns: [users.id],
    name: 'gym_checkin_user_id_fkey',
  }),
  pgPolicy('Enable update for users based on user_id', { as: 'permissive', for: 'update', to: ['authenticated'], using: sql`(auth.uid() = user_id)` }),
  pgPolicy('Enable select for users based on user_id', { as: 'permissive', for: 'select', to: ['authenticated'] }),
  pgPolicy('Enable insert for authenticated users only', { as: 'permissive', for: 'insert', to: ['authenticated'] }),
  pgPolicy('Enable delete for users based on user_id', { as: 'permissive', for: 'delete', to: ['authenticated'] }),
])

export const userProfile = pgTable('user_profile', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint({ mode: 'number' }).primaryKey().generatedByDefaultAsIdentity({ name: 'user_profile_id_seq', startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
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
