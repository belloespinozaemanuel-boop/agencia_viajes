import { Module } from '@nestjs/common';
import { DestinosService } from './destinos.service';
import { DestinosController } from './destinos.controller';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [DestinosController],
  providers: [DestinosService],
})
export class DestinosModule { }