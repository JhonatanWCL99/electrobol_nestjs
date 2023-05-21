import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from 'src/entities/Equipo.entity';
import { Evaluacion } from 'src/entities/Evaluacion.entity';
import { EvaluacionController } from './evaluaciones.controller';
import { EvaluacionService } from './evaluaciones.service';
import { Reparacion } from 'src/entities/Reparacion.entity';
import { Tecnico } from 'src/entities/Tecnico.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Equipo, Evaluacion, Reparacion, Tecnico]),
  ],
  controllers: [EvaluacionController],
  providers: [EvaluacionService],
})
export class EvaluacionesModule {}
