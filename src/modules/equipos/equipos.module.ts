import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/entities/Cliente.entity';
import { Equipo } from 'src/entities/Equipo.entity';
import { EquipoController } from './equipos.controller';
import { EquipoService } from './equipos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Equipo, Cliente])],
  controllers: [EquipoController],
  providers: [EquipoService],
})
export class EquiposModule {}
