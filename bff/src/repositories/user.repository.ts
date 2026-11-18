import { eq, desc } from 'drizzle-orm';
import { db } from '../db';
import { users } from '../db/schema';
import { or, ilike, count, asc } from 'drizzle-orm';

import { and } from 'drizzle-orm';

export const findAllUsers = async (
    limit: number,
    offset: number,
    search?: string,
    sortBy: 'name' | 'email' | 'createdAt' = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc'
) => {
    const searchCondition = search
        ? or(
            ilike(users.name, `%${search}%`),
            ilike(users.email, `%${search}%`)
        )
        : undefined;

    const sortColumn = {
        name: users.name,
        email: users.email,
        createdAt: users.createdAt,
    }[sortBy];

    const orderBy = sortOrder === 'asc'
        ? asc(sortColumn)
        : desc(sortColumn);

    const [data, totalResult] = await Promise.all([
        db.select()
            .from(users)
            .where(searchCondition)
            .orderBy(orderBy)
            .limit(limit)
            .offset(offset),

        db.select({ total: count() })
            .from(users)
            .where(searchCondition),
    ]);

    return {
        data,
        total: Number(totalResult[0].total),
    };
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