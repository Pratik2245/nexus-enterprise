import { describe, it, expect } from 'vitest';
import request from 'supertest';

import app from '../src/app';

describe('User API Negative Tests', () => {

    it('should reject creating a duplicate user', async () => {
        const uniqueId = Date.now();

        const userData = {
            issuer: 'https://nexus-test.example.com',
            subject: `duplicate-${uniqueId}`,
            name: 'Duplicate Test',
            email: `duplicate-${uniqueId}@example.com`,
        };

        let userId: number | undefined;

        try {
            const firstResponse = await request(app)
                .post('/api/v1/users')
                .send(userData);

            expect(firstResponse.status).toBe(201);

            const createdUser =
                firstResponse.body.data ?? firstResponse.body;

            userId = createdUser.id;

            const secondResponse = await request(app)
                .post('/api/v1/users')
                .send(userData);

            expect(secondResponse.status).toBe(409);

        } finally {
            if (userId !== undefined) {
                await request(app).delete(`/api/v1/users/${userId}`);
            }
        }
    });

    it('should reject creating a user without required fields', async () => {
        const response = await request(app)
            .post('/api/v1/users')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('should reject an invalid email address', async () => {
        const response = await request(app)
            .post('/api/v1/users')
            .send({
                issuer: 'https://nexus-test.example.com',
                subject: 'negative-test-1',
                name: 'Test User',
                email: 'invalid-email',
            });

        expect(response.status).toBe(400);
    });

    it('should reject updating a user with an empty body', async () => {
        const response = await request(app)
            .patch('/api/v1/users/0')
            .send({});

        expect(response.status).toBe(400);
    });

    it('should return 404 when a user does not exist', async () => {
        const response = await request(app)
            .get('/api/v1/users/0');

        expect(response.status).toBe(404);
    });

    it('should return 404 when updating a nonexistent user', async () => {
        const response = await request(app)
            .patch('/api/v1/users/0')
            .send({
                name: 'Updated User',
            });

        expect(response.status).toBe(404);
    });

    it('should return 404 when deleting a nonexistent user', async () => {
        const response = await request(app)
            .delete('/api/v1/users/0');

        expect(response.status).toBe(404);
    });

});