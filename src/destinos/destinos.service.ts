import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { destinos } from '../drizzle/schema';
import { CreateDestinoDto } from './dto/create-destino.dto';
import { isNull } from 'drizzle-orm';

@Injectable()
export class DestinosService {
    constructor(private readonly drizzle: DrizzleService) { }

    async create(dto: CreateDestinoDto) {
        const [destino] = await this.drizzle.db.insert(destinos).values(dto).returning();
        return destino;
    }

    async findAll() {
        return this.drizzle.db.select().from(destinos).where(isNull(destinos.deletedAt));
    }
}