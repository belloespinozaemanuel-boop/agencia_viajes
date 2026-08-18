import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { reservas, paquetes, clientes } from '../drizzle/schema';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { eq, isNull, and, sql } from 'drizzle-orm';

@Injectable()
export class ReservasService {
    constructor(private readonly drizzle: DrizzleService) { }

    async create(dto: CreateReservaDto) {
        // 1. Verificar si el paquete existe y no está eliminado
        const [paquete] = await this.drizzle.db
            .select()
            .from(paquetes)
            .where(and(eq(paquetes.id, dto.paqueteId), isNull(paquetes.deletedAt)));

        if (!paquete) {
            throw new NotFoundException('El paquete especificado no existe');
        }

        // 2. Verificar cliente
        const [cliente] = await this.drizzle.db
            .select()
            .from(clientes)
            .where(and(eq(clientes.id, dto.clienteId), isNull(clientes.deletedAt)));

        if (!cliente) {
            throw new NotFoundException('El cliente especificado no existe');
        }

        // 3. Calcular plazas reservadas actualmente
        const [resultadoReserva] = await this.drizzle.db
            .select({
                totalReservado: sql<number>`COALESCE(SUM(${reservas.cantidadPersonas}), 0)`,
            })
            .from(reservas)
            .where(and(eq(reservas.paqueteId, dto.paqueteId), isNull(reservas.deletedAt)));

        const cuposOcupados = Number(resultadoReserva?.totalReservado || 0);
        const cuposDisponibles = paquete.capacidad - cuposOcupados;

        // 4. Validar disponibilidad
        if (dto.cantidadPersonas > cuposDisponibles) {
            throw new ConflictException(
                `No hay suficientes cupos. Disponibles: ${cuposDisponibles}, solicitados: ${dto.cantidadPersonas}`,
            );
        }

        const [reserva] = await this.drizzle.db.insert(reservas).values(dto).returning();
        return reserva;
    }

    async findAll() {
        return this.drizzle.db.select().from(reservas).where(isNull(reservas.deletedAt));
    }

    async findOne(id: number) {
        const [reserva] = await this.drizzle.db
            .select()
            .from(reservas)
            .where(and(eq(reservas.id, id), isNull(reservas.deletedAt)));

        if (!reserva) {
            throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
        }

        return reserva;
    }

    async update(id: number, dto: UpdateReservaDto) {
        const reservaExistente = await this.findOne(id);

        const paqueteId = dto.paqueteId || reservaExistente.paqueteId;
        const cantidadNueva = dto.cantidadPersonas || reservaExistente.cantidadPersonas;

        const [paquete] = await this.drizzle.db
            .select()
            .from(paquetes)
            .where(and(eq(paquetes.id, paqueteId), isNull(paquetes.deletedAt)));

        if (!paquete) {
            throw new NotFoundException('El paquete especificado no existe');
        }

        // Sumar plazas activas exceptuando la reserva actual
        const [resultadoReserva] = await this.drizzle.db
            .select({
                totalReservado: sql<number>`COALESCE(SUM(${reservas.cantidadPersonas}), 0)`,
            })
            .from(reservas)
            .where(
                and(
                    eq(reservas.paqueteId, paqueteId),
                    isNull(reservas.deletedAt),
                    sql`${reservas.id} != ${id}`,
                ),
            );

        const cuposOcupadosOtros = Number(resultadoReserva?.totalReservado || 0);
        const cuposDisponibles = paquete.capacidad - cuposOcupadosOtros;

        if (cantidadNueva > cuposDisponibles) {
            throw new ConflictException(
                `No hay suficientes cupos para actualizar. Disponibles: ${cuposDisponibles}`,
            );
        }

        const [reservaActualizada] = await this.drizzle.db
            .update(reservas)
            .set(dto)
            .where(eq(reservas.id, id))
            .returning();

        return reservaActualizada;
    }

    async remove(id: number) {
        await this.findOne(id);

        const [reservaEliminada] = await this.drizzle.db
            .update(reservas)
            .set({ deletedAt: new Date() })
            .where(eq(reservas.id, id))
            .returning();

        return { message: 'Reserva eliminada lógicamente', id: reservaEliminada.id };
    }
}