import { Module } from '@nestjs/common';
import { DrizzleModule } from './drizzle/drizzle.module';
import { DestinosModule } from './destinos/destinos.module';
import { ClientesModule } from './clientes/clientes.module';
import { PaquetesModule } from './paquetes/paquetes.module';
import { ReservasModule } from './reservas/reservas.module';



@Module({
  imports: [DrizzleModule, DestinosModule, ClientesModule, PaquetesModule, ReservasModule],

})
export class AppModule { }
