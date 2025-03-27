import { relations } from 'drizzle-orm/relations'
import { gymCheckin, userProfile, usersInAuth } from './schema'

export const gymCheckinRelations = relations(gymCheckin, ({ one }) => ({
  usersInAuth: one(usersInAuth, {
    fields: [gymCheckin.userId],
    references: [usersInAuth.id],
  }),
}))

export const usersInAuthRelations = relations(usersInAuth, ({ many }) => ({
  gymCheckins: many(gymCheckin),
  userProfiles: many(userProfile),
}))

export const userProfileRelations = relations(userProfile, ({ one }) => ({
  usersInAuth: one(usersInAuth, {
    fields: [userProfile.userId],
    references: [usersInAuth.id],
  }),
}))
