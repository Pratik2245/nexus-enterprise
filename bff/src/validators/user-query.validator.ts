import { z } from 'zod';

export const userQuerySchema = z.object({
    page: z.coerce.number()
        .int()
        .positive()
        .default(1),

    limit: z.coerce.number()
        .int()
        .min(1)
        .max(100)
        .default(10),

    search: z.string()
        .trim()
        .optional(),

    sortBy: z.enum(['name', 'email', 'createdAt'])
        .default('createdAt'),

    sortOrder: z.enum(['asc', 'desc'])
        .default('desc'),
});