import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as schema from './schema';

// Fuerza la carga de variables desde el archivo .env antes de instanciar el servicio
dotenv.config();

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
    public db!: NodePgDatabase<typeof schema>;
    private pool!: Pool;

    constructor(private configService: ConfigService) {
        const connectionString =
            this.configService.get<string>('DATABASE_URL') || process.env.DATABASE_URL;

        if (!connectionString) {
            throw new Error('DATABASE_URL no está definida en el archivo .env');
        }

        this.pool = new Pool({
            connectionString,
        });

        this.db = drizzle(this.pool, { schema });
    }

    async onModuleInit() {
        await this.pool.connect();
    }

    async onModuleDestroy() {
        await this.pool.end();
    }
}