import { pgTable, serial, integer, timestamp } from 'drizzle-orm/pg-core';
import { clientes } from './clientes.schema';
import { paquetes } from './paquetes.schema';

export const reservas = pgTable('reservas', {
    id: serial('id').primaryKey(),
    clienteId: integer('cliente_id')
        .notNull()
        .references(() => clientes.id),
    paqueteId: integer('paquete_id')
        .notNull()
        .references(() => paquetes.id),
    cantidadPersonas: integer('cantidad_personas').notNull(),
    fechaReserva: timestamp('fecha_reserva').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
});