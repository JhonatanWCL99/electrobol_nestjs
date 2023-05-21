import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reparacion } from 'src/entities/Reparacion.entity';
import { ReparacionController } from './reparaciones.controller';
import { ReparacionService } from './reparaciones.service';
import { DetalleReparacion } from 'src/entities/DetalleReparacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reparacion, DetalleReparacion])],
  controllers: [ReparacionController],
  providers: [ReparacionService],
})
export class ReparacionesModule {}
