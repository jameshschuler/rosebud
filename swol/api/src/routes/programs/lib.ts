import z from 'zod'
import { selectProgramsSchema } from '@/db/schemas/programs.schemas'

export const listProgramsQuerySchema = z.object({
  author: z.string().optional().openapi({
    param: {
      name: 'author',
      in: 'query',
      required: false,
      description: 'Filter programs by author.',
    },
    example: 'John Doe',
  }),
  name: z.string().optional().openapi({
    param: {
      name: 'name',
      in: 'query',
      required: false,
      description: 'Filter programs by name.',
    },
    example: 'My Awesome Program',
  }),
  programType: z.string().optional().openapi({
    param: {
      name: 'programType',
      in: 'query',
      required: false,
      description: 'Filter programs by type.',
    },
    example: 'Strength Training',
  }),
})

export const listProgramsResponseSchema = z.object({
  programs: z.array(selectProgramsSchema.omit({ userId: true })),
  currentPrograms: z.record(z.string(), z.object({
    type: z.string(),
    name: z.string(),
    id: z.number(),
  })),
})
