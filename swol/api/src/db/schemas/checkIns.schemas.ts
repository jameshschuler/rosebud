import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import z from 'zod'
import { gymCheckin } from '../schema'

export const selectCheckInSchema = createSelectSchema(gymCheckin).omit({
  userId: true,
  createdAt: true,
})

export const selectCheckInsSchema = createSelectSchema(gymCheckin)
  .extend({
    activity: z.object({
      id: z.number(),
      name: z.string(),
    }),
    program: z.object({
      id: z.number(),
      name: z.string(),
    }).nullable(),
  })
  .pick({
    id: true,
    checkinDate: true,
    activity: true,
    program: true,
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
  .required({
    checkinDate: true,
    activityId: true,
  })
  .omit({
    id: true,
    createdAt: true,
    userId: true,
  })

export const patchCheckInsSchema = insertCheckInsSchema.partial()
