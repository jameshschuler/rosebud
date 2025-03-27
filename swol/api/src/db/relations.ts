import { relations } from 'drizzle-orm/relations'
import { gymCheckin, userProfile, users } from './schema'

export const gymCheckinRelations = relations(gymCheckin, ({ one }) => ({
  usersInAuth: one(users, {
    fields: [gymCheckin.userId],
    references: [users.id],
  }),
}))

export const usersInAuthRelations = relations(users, ({ many }) => ({
  gymCheckins: many(gymCheckin),
  userProfiles: many(userProfile),
}))

export const userProfileRelations = relations(userProfile, ({ one }) => ({
  usersInAuth: one(users, {
    fields: [userProfile.userId],
    references: [users.id],
  }),
}))
