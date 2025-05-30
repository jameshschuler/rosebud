import { relations } from "drizzle-orm/relations";
import { activity, gymCheckin, usersInAuth, userProfile } from "./schema";

export const gymCheckinRelations = relations(gymCheckin, ({one}) => ({
	activity: one(activity, {
		fields: [gymCheckin.activityId],
		references: [activity.id]
	}),
	usersInAuth: one(usersInAuth, {
		fields: [gymCheckin.userId],
		references: [usersInAuth.id]
	}),
}));

export const activityRelations = relations(activity, ({many}) => ({
	gymCheckins: many(gymCheckin),
}));

export const usersInAuthRelations = relations(usersInAuth, ({many}) => ({
	gymCheckins: many(gymCheckin),
	userProfiles: many(userProfile),
}));

export const userProfileRelations = relations(userProfile, ({one}) => ({
	usersInAuth: one(usersInAuth, {
		fields: [userProfile.userId],
		references: [usersInAuth.id]
	}),
}));