import { ConflictException, Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { clientes } from '../drizzle/schema';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { eq, isNull } from 'drizzle-orm';

@Injectable()
export class ClientesService {
    constructor(private readonly drizzle: DrizzleService) { }

    async create(dto: CreateClienteDto) {
        const [existente] = await this.drizzle.db
            .select()
            .from(clientes)
            .where(eq(clientes.email, dto.email));

        if (existente) {
            throw new ConflictException('El email ya se encuentra registrado');
        }

        const [cliente] = await this.drizzle.db.insert(clientes).values(dto).returning();
        return cliente;
    }

    async findAll() {
        return this.drizzle.db.select().from(clientes).where(isNull(clientes.deletedAt));
    }
}