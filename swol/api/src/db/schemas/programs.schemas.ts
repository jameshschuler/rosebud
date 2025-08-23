import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { programs } from '../schema'

export const selectProgramsSchema = createSelectSchema(programs)

export const getOneProgramSchema = selectProgramsSchema.omit({ userId: true })

export const insertProgramsSchema = createInsertSchema(programs, {
  programType: schema => schema
    .refine((value) => {
      const validTypes = ['Strength Training', 'Running']
      return validTypes.includes(value)
    }, 'Invalid program type. Valid types are: Strength Training or Running'),
})
  .required({
    name: true,
    programType: true,
    author: true,
  })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    userId: true,
  })

  export const patchProgramsSchema = insertProgramsSchema.partial()
