import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app-error';

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('Error:', error);

    if (res.headersSent) {
        return next(error);
    }

    // PostgreSQL unique constraint violation
    if ('code' in error && error.code === '23505') {
        return res.status(409).json({
            success: false,
            message: 'A record with these unique values already exists',
        });
    }

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
        });
    }

    return res.status(500).json({
        success: false,
        message: 'Internal server error',
    });
};