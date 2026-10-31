import { Request, Response } from 'express';

export const getHealth = (
    req: Request,
    res: Response
) => {
    res.status(200).json({
        status: 'UP',
        application: 'NEXUS-BFF',
        version: '1.0.0',
        message: 'Backend is running successfully'
    });
};