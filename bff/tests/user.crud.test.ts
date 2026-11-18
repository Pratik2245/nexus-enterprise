import { describe, it, expect } from 'vitest';
import request from 'supertest';

import app from '../src/app';

describe('User CRUD API Integration Tests', () => {
    it('should create, retrieve, update and delete a user', async () => {

        // Safety check: never run this test against development DB.
        expect(process.env.DATABASE_URL).toContain('nexus_test_db');

        const uniqueId = Date.now();

        let userId: number | undefined;

        try {
            // 1. CREATE USER
            const createResponse = await request(app)
                .post('/api/v1/users')
                .send({
                    issuer: 'https://nexus-test.example.com',
                    subject: `vitest-${uniqueId}`,
                    name: 'Vitest User',
                    email: `vitest-${uniqueId}@example.com`,
                });

            expect(createResponse.status).toBe(201);

            const createdUser =
                createResponse.body.data ?? createResponse.body;

            userId = createdUser.id;

            expect(userId).toBeDefined();
            expect(createdUser.name).toBe('Vitest User');

            // 2. RETRIEVE USER
            const getResponse = await request(app)
                .get(`/api/v1/users/${userId}`);

            expect(getResponse.status).toBe(200);

            const retrievedUser =
                getResponse.body.data ?? getResponse.body;

            expect(retrievedUser.id).toBe(userId);

            // 3. UPDATE USER
            const updateResponse = await request(app)
                .patch(`/api/v1/users/${userId}`)
                .send({
                    name: 'Updated Vitest User',
                });

            expect(updateResponse.status).toBe(200);

            // Verify updated data
            const verifyResponse = await request(app)
                .get(`/api/v1/users/${userId}`);

            const updatedUser =
                verifyResponse.body.data ?? verifyResponse.body;

            expect(updatedUser.name).toBe('Updated Vitest User');

            // 4. DELETE USER
            const deleteResponse = await request(app)
                .delete(`/api/v1/users/${userId}`);

            expect(deleteResponse.status).toBe(200);
            userId = undefined;

        } finally {
            // Clean up if an earlier assertion fails.
            if (userId !== undefined) {
                await request(app).delete(`/api/v1/users/${userId}`);
            }
        }
    });
});