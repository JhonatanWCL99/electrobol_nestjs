import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { EvaluacionService } from './evaluaciones.service';
import { Evaluacion } from 'src/entities/Evaluacion.entity';
import { CreateEvaluacionDto } from './dtos/create-evaluacion';
import { UpdateEvaluacionDto } from './dtos/update-evaluacion';
import { Tecnico } from 'src/entities/Tecnico.entity';

@Controller('evaluaciones')
export class EvaluacionController {
  constructor(private readonly evaluacionService: EvaluacionService) {}

  @Get()
  findAll(): Promise<Evaluacion[]> {
    return this.evaluacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Evaluacion> {
    return this.evaluacionService.findOne(id);
  }

  @Post()
  create(
    @Body() evaluacionCreateDto: CreateEvaluacionDto,
  ): Promise<Evaluacion> {
    return this.evaluacionService.create(evaluacionCreateDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateEvaluacionDto: UpdateEvaluacionDto,
  ): Promise<Evaluacion> {
    return this.evaluacionService.update(id, updateEvaluacionDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.evaluacionService.delete(id);
  }

  @Get('/reporte-tecnico/:tecnico')
  getReporte(@Param('tecnico') tecnico: string): Promise<Tecnico> {
    return this.evaluacionService.buscarEvaluacionesYReparacionesPorTecnico(
      tecnico,
    );
  }
}
