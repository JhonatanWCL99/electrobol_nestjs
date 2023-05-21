import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repuesto } from 'src/entities/Repuesto.entity';
import { RepuestoController } from './repuestos.controller';
import { RepuestoService } from './respuestos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Repuesto])],
  controllers: [RepuestoController],
  providers: [RepuestoService],
})
export class RepuestosModule {}
