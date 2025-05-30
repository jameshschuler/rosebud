import { relations } from 'drizzle-orm/relations'
import { activity, gymCheckin, userProfile, users } from './schema'

export const gymCheckinRelations = relations(gymCheckin, ({ one }) => ({
  activity: one(activity, {
    fields: [gymCheckin.activityId],
    references: [activity.id],
  }),
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

export const activityRelations = relations(activity, ({ many }) => ({
  gymCheckins: many(gymCheckin),
}))
