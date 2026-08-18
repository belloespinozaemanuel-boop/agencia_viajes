import { pgTable, serial, varchar, text, numeric, integer, timestamp } from 'drizzle-orm/pg-core';
import { destinos } from './destinos.schema';

export const paquetes = pgTable('paquetes', {
    id: serial('id').primaryKey(),
    nombre: varchar('nombre', { length: 150 }).notNull(),
    descripcion: text('descripcion'),
    precio: numeric('precio', { precision: 10, scale: 2 }).notNull(),
    capacidad: integer('capacidad').notNull(),
    destinoId: integer('destino_id')
        .notNull()
        .references(() => destinos.id),
    deletedAt: timestamp('deleted_at'),
});