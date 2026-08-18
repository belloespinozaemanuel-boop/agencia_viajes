import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

export const clientes = pgTable('clientes', {
    id: serial('id').primaryKey(),
    nombre: varchar('nombre', { length: 100 }).notNull(),
    apellido: varchar('apellido', { length: 100 }).notNull(),
    email: varchar('email', { length: 150 }).notNull().unique(),
    telefono: varchar('telefono', { length: 20 }),
    deletedAt: timestamp('deleted_at'),
});