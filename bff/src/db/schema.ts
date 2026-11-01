import {
    pgTable,
    serial,
    varchar,
    timestamp,
    uniqueIndex,
} from 'drizzle-orm/pg-core';

export const users = pgTable(
    'users',
    {
        id: serial('id').primaryKey(),

        issuer: varchar('issuer', { length: 500 }).notNull(),

        subject: varchar('subject', { length: 255 }).notNull(),

        name: varchar('name', { length: 255 }).notNull(),

        email: varchar('email', { length: 255 }).notNull(),

        status: varchar('status', { length: 20 })
            .notNull()
            .default('ACTIVE'),

        createdAt: timestamp('created_at')
            .defaultNow()
            .notNull(),

        updatedAt: timestamp('updated_at')
            .defaultNow()
            .notNull(),
    },
    (table) => [
        uniqueIndex('users_issuer_subject_unique')
            .on(table.issuer, table.subject),
    ],
);