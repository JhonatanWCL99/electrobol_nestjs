import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './modules/clientes/clientes.module';
import { TecnicosModule } from './modules/tecnicos/tecnicos.module';
import { EquiposModule } from './modules/equipos/equipos.module';
import { EvaluacionesModule } from './modules/evaluaciones/evaluaciones.module';
import { ReparacionesModule } from './modules/reparaciones/reparaciones.module';
import { RepuestosModule } from './modules/repuestos/repuestos.module';
import { join } from 'path';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-jhonatan.alwaysdata.net',
      port: 3306,
      username: 'jhonatan',
      password: '71387934',
      database: 'jhonatan_electrobol',
      entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
      synchronize: true,
    }),
    ClientesModule,
    TecnicosModule,
    EquiposModule,
    EvaluacionesModule,
    ReparacionesModule,
    RepuestosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
