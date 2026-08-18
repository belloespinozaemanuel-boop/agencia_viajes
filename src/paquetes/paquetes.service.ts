import { Injectable, NotFoundException } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { paquetes, destinos } from '../drizzle/schema';
import { CreatePaqueteDto } from './dto/create-paquete.dto';
import { UpdatePaqueteDto } from './dto/update-paquete.dto';
import { eq, isNull, and } from 'drizzle-orm';

@Injectable()
export class PaquetesService {
    constructor(private readonly drizzle: DrizzleService) { }

    async create(dto: CreatePaqueteDto) {
        const [destino] = await this.drizzle.db
            .select()
            .from(destinos)
            .where(and(eq(destinos.id, dto.destinoId), isNull(destinos.deletedAt)));

        if (!destino) {
            throw new NotFoundException('El destino especificado no existe');
        }

        const [paquete] = await this.drizzle.db
            .insert(paquetes)
            .values({ ...dto, precio: dto.precio.toString() })
            .returning();

        return paquete;
    }

    async findAll() {
        return this.drizzle.db.select().from(paquetes).where(isNull(paquetes.deletedAt));
    }

    async findOne(id: number) {
        const [paquete] = await this.drizzle.db
            .select()
            .from(paquetes)
            .where(and(eq(paquetes.id, id), isNull(paquetes.deletedAt)));

        if (!paquete) {
            throw new NotFoundException(`Paquete con ID ${id} no encontrado`);
        }

        return paquete;
    }

    async update(id: number, dto: UpdatePaqueteDto) {
        await this.findOne(id);

        const updateData: any = { ...dto };
        if (dto.precio !== undefined) {
            updateData.precio = dto.precio.toString();
        }

        const [paqueteActualizado] = await this.drizzle.db
            .update(paquetes)
            .set(updateData)
            .where(eq(paquetes.id, id))
            .returning();

        return paqueteActualizado;
    }

    async remove(id: number) {
        await this.findOne(id);

        const [paqueteEliminado] = await this.drizzle.db
            .update(paquetes)
            .set({ deletedAt: new Date() })
            .where(eq(paquetes.id, id))
            .returning();

        return { message: 'Paquete eliminado lógicamente', id: paqueteEliminado.id };
    }
}