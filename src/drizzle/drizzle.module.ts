import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DrizzleService } from './drizzle.service';

@Module({
    imports: [ConfigModule], // <--- Agrega esta línea
    providers: [DrizzleService],
    exports: [DrizzleService],
})
export class DrizzleModule { }