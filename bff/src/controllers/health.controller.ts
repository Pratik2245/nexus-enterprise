import { Request, Response } from 'express';
import { db } from '../db';
import { sql } from 'drizzle-orm';

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

export const getDatabaseHealth = async (
    req: Request,
    res: Response
) => {
    try {
        await db.execute(sql`SELECT 1`);

        res.status(200).json({
            status: 'UP',
            database: 'PostgreSQL',
            message: 'Database connection successful',
        });
    } catch (error) {
        console.error('Database health check failed:', error);

        res.status(503).json({
            status: 'DOWN',
            database: 'PostgreSQL',
            message: 'Database connection failed',
        });
    }
};