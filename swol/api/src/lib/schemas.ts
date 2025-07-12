import z from "zod";

export const IdsParamsSchema = z.object({
    ids: z.string().refine(value => value.split(',').every(id => !isNaN(Number(id))), {
        message: "ids must be a comma-separated string of numbers."
    }).openapi({
        param: {
            name: "ids",
            in: "query",
            required: true,
            description: "A comma-separated list of IDs."
        },
        example: "1,2,3,42",
    }),
});