import { Module } from '@nestjs/common';
import { PaquetesService } from './paquetes.service';
import { PaquetesController } from './paquetes.controller';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [PaquetesController],
  providers: [PaquetesService],
})
export class PaquetesModule { }
