import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

export const validate = (
    schema: ZodType,
    property: 'body' | 'query' = 'body'
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req[property]);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: result.error.issues.map(issue => ({
                    field: issue.path.join('.'),
                    message: issue.message,
                })),
            });
        }

        if (property === 'body') {
            req.body = result.data;
        } else {
            res.locals.validatedQuery = result.data;
        }

        next();
    };
};