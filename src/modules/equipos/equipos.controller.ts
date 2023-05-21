import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { EquipoService } from './equipos.service';
import { Equipo } from 'src/entities/Equipo.entity';
import { CreateEquipoDto } from './dtos/create-equipo';
import { UpdateEquipoDto } from './dtos/update-equipo';

@Controller('equipos')
export class EquipoController {
  constructor(private readonly equipoService: EquipoService) {}

  @Get()
  findAll(): Promise<Equipo[]> {
    return this.equipoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Equipo> {
    return this.equipoService.findOne(id);
  }

  @Post()
  create(@Body() equipoCreateDto: CreateEquipoDto): Promise<Equipo> {
    return this.equipoService.create(equipoCreateDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateEquipoDto: UpdateEquipoDto,
  ): Promise<Equipo> {
    return this.equipoService.update(id, updateEquipoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.equipoService.delete(id);
  }
}
