import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from 'src/entities/Persona.entity';
import { Tecnico } from 'src/entities/Tecnico.entity';
import { TecnicoController } from './tecnicos.controller';
import { TecnicoService } from './tecnicos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tecnico, Persona])],
  controllers: [TecnicoController],
  providers: [TecnicoService],
})
export class TecnicosModule {}
