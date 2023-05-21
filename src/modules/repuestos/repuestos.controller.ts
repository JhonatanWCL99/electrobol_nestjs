import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { RepuestoService } from './respuestos.service';
import { Repuesto } from 'src/entities/Repuesto.entity';
import { CreateRepuestoDto } from './dtos/create-repuesto';
import { UpdateRepuestoDto } from './dtos/update-repuesto';

@Controller('repuestos')
export class RepuestoController {
  constructor(private readonly repuestoService: RepuestoService) {}

  @Get()
  findAll(): Promise<Repuesto[]> {
    return this.repuestoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Repuesto> {
    return this.repuestoService.findOne(id);
  }

  @Post()
  create(@Body() repuestoCreateDto: CreateRepuestoDto): Promise<Repuesto> {
    return this.repuestoService.create(repuestoCreateDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateRepuestoDto: UpdateRepuestoDto,
  ): Promise<Repuesto> {
    return this.repuestoService.update(id, updateRepuestoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.repuestoService.delete(id);
  }
}
