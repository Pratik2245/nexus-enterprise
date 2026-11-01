import { eq, desc } from 'drizzle-orm';
import { db } from '../db';
import { users } from '../db/schema';
import { and } from 'drizzle-orm';

export const findAllUsers = async () => {
    return db
        .select()
        .from(users)
        .orderBy(desc(users.createdAt));
};

export const findUserById = async (id: number) => {
    const result = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);

    return result[0] ?? null;
};

export const findUserByIdentity = async (
    issuer: string,
    subject: string
) => {
    const result = await db
        .select()
        .from(users)
        .where(
            and(
                eq(users.issuer, issuer),
                eq(users.subject, subject)
            )
        )
        .limit(1);

    return result[0] ?? null;
};

export const createUser = async (
    userData: typeof users.$inferInsert
) => {
    const result = await db
        .insert(users)
        .values(userData)
        .returning();

    return result[0];
};

export const updateUser = async (
    id: number,
    userData: Partial<typeof users.$inferInsert>
) => {
    const result = await db
        .update(users)
        .set({
            ...userData,
            updatedAt: new Date(),
        })
        .where(eq(users.id, id))
        .returning();

    return result[0] ?? null;
};

export const deleteUser = async (id: number) => {
    const result = await db
        .delete(users)
        .where(eq(users.id, id))
        .returning();

    return result[0] ?? null;
};