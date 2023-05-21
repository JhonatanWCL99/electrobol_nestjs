import { Controller, Get, Param, Delete, Body, Put } from '@nestjs/common';
import { ReparacionService } from './reparaciones.service';
import { Reparacion } from 'src/entities/Reparacion.entity';
import { UpdateReparacionDto } from './dtos/update-reparacion';

@Controller('reparaciones')
export class ReparacionController {
  constructor(private readonly reparacionService: ReparacionService) {}

  @Get()
  findAll(): Promise<Reparacion[]> {
    return this.reparacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Reparacion> {
    return this.reparacionService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateReparacionDto: UpdateReparacionDto,
  ): Promise<Reparacion> {
    return this.reparacionService.update(id, updateReparacionDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.reparacionService.delete(id);
  }
}
