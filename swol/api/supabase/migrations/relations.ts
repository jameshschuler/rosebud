import { relations } from "drizzle-orm/relations";
import { usersInAuth, programs, userProfile, gymCheckin, activity } from "./schema";

export const programsRelations = relations(programs, ({one, many}) => ({
	usersInAuth: one(usersInAuth, {
		fields: [programs.userId],
		references: [usersInAuth.id]
	}),
	gymCheckins: many(gymCheckin),
}));

export const usersInAuthRelations = relations(usersInAuth, ({many}) => ({
	programs: many(programs),
	userProfiles: many(userProfile),
	gymCheckins: many(gymCheckin),
}));

export const userProfileRelations = relations(userProfile, ({one}) => ({
	usersInAuth: one(usersInAuth, {
		fields: [userProfile.userId],
		references: [usersInAuth.id]
	}),
}));

export const gymCheckinRelations = relations(gymCheckin, ({one}) => ({
	usersInAuth: one(usersInAuth, {
		fields: [gymCheckin.userId],
		references: [usersInAuth.id]
	}),
	program: one(programs, {
		fields: [gymCheckin.programId],
		references: [programs.id]
	}),
	activity: one(activity, {
		fields: [gymCheckin.activityId],
		references: [activity.id]
	}),
}));

export const activityRelations = relations(activity, ({many}) => ({
	gymCheckins: many(gymCheckin),
}));