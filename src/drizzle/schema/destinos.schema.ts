import { pgTable, serial, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const destinos = pgTable('destinos', {
    id: serial('id').primaryKey(),
    nombre: varchar('nombre', { length: 100 }).notNull(),
    pais: varchar('pais', { length: 100 }).notNull(),
    descripcion: text('descripcion'),
    deletedAt: timestamp('deleted_at'),
});