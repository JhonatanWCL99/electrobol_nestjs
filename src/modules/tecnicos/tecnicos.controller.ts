import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TecnicoService } from './tecnicos.service';
import { CreateTecnicoDto } from './dtos/create-tecnico';
import { Tecnico } from 'src/entities/Tecnico.entity';
import { UpdateTecnicoDto } from './dtos/update-tecnico';

@Controller('tecnicos')
export class TecnicoController {
  constructor(private readonly tecnicoService: TecnicoService) {}

  @Get()
  findAll(): Promise<Tecnico[]> {
    return this.tecnicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Tecnico> {
    return this.tecnicoService.findOne(id);
  }

  @Post()
  create(@Body() createTecnicoDto: CreateTecnicoDto): Promise<Tecnico> {
    return this.tecnicoService.create(createTecnicoDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateTecnicoDto: UpdateTecnicoDto,
  ): Promise<Tecnico> {
    return this.tecnicoService.update(id, updateTecnicoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.tecnicoService.delete(id);
  }
}
