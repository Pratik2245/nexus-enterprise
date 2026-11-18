import { describe, it, expect } from 'vitest';
import request from 'supertest';

import app from '../src/app';

describe('User API Query Validation', () => {

    it('should reject an invalid page number', async () => {
        const response = await request(app)
            .get('/api/v1/users?page=abc');

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('should reject a negative page number', async () => {
        const response = await request(app)
            .get('/api/v1/users?page=-5');

        expect(response.status).toBe(400);
    });

    it('should reject a limit greater than 100', async () => {
        const response = await request(app)
            .get('/api/v1/users?limit=5000');

        expect(response.status).toBe(400);
    });

    it('should reject an unsupported sorting field', async () => {
        const response = await request(app)
            .get('/api/v1/users?sortBy=password');

        expect(response.status).toBe(400);
    });

    it('should reject an invalid sorting order', async () => {
        const response = await request(app)
            .get('/api/v1/users?sortOrder=random');

        expect(response.status).toBe(400);
    });

});