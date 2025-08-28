import z from 'zod'

export const listCheckInsQuerySchema = z.object({
  ids: z.string()
    .optional()
    .transform((idsString) => {
      if (idsString) {
        return idsString.split(',').map(id => Number.parseInt(id, 10))
      }
      return undefined
    })
    .openapi({
      param: {
        name: 'ids',
        in: 'query',
        required: false,
        description: 'Filter check ins by IDs (comma-separated).',
        example: '1,2,3',
      },
    }),
  year: z.string().optional().openapi({
    param: {
      name: 'year',
      in: 'query',
      required: false,
      description: 'Filter check ins by year.',
    },
    example: '2025',
  }),
  month: z
    .string()
    .regex(/^(0?[1-9]|1[0-2])(-(0?[1-9]|1[0-2]))?$/, 'Invalid month format. Expected "1" or "1-3".')
    .optional()
    .openapi({
      param: {
        name: 'month',
        in: 'query',
        required: false,
        description: 'Filter check ins by month. Can be a single month (e.g., "11") or a range of months (e.g., "1-3").',
      },
      example: '1-3',
    }),
})
