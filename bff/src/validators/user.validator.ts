import { z } from 'zod';

export const createUserSchema = z.object({
    issuer: z.string().url(),

    subject: z.string().min(1, 'Subject is required'),

    name: z.string().min(2, 'Name must contain at least 2 characters'),

    email: z.string().email('Invalid email address'),
});

export const updateUserSchema = z.object({
    name: z.string().min(2).optional(),

    email: z.string().email().optional(),

    status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
}).refine(
    (data) => Object.keys(data).length > 0,
    { message: 'At least one field must be provided' }
);