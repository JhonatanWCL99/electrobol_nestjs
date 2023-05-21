import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repuesto } from 'src/entities/Repuesto.entity';
import { Repository } from 'typeorm';
import { CreateRepuestoDto } from './dtos/create-repuesto';
import { UpdateRepuestoDto } from './dtos/update-repuesto';

@Injectable()
export class RepuestoService {
  constructor(
    @InjectRepository(Repuesto)
    private readonly repuestoRepository: Repository<Repuesto>,
  ) {}

  findAll(): Promise<Repuesto[]> {
    return this.repuestoRepository.find();
  }

  async findOne(id: number): Promise<Repuesto> {
    return await this.repuestoRepository.findOne({
      where: {
        id,
      },
    });
  }

  async create(repuestoCreateDto: CreateRepuestoDto): Promise<Repuesto> {
    const repuesto = new Repuesto();
    repuesto.nombre = repuestoCreateDto.nombre;
    repuesto.descripcion = repuestoCreateDto.descripcion;
    repuesto.proveedor = repuestoCreateDto.proveedor;
    repuesto.precio = repuestoCreateDto.precio;
    return await this.repuestoRepository.save(repuesto);
  }

  async update(
    id: number,
    updateRepuestoDto: UpdateRepuestoDto,
  ): Promise<Repuesto> {
    const existingRepuesto = await this.repuestoRepository.findOne({
      where: { id },
    });
    if (!existingRepuesto) {
      throw new Error('Equipo not found');
    }

    const updatedRepuesto = new Repuesto();
    updatedRepuesto.nombre = updateRepuestoDto.nombre;
    updatedRepuesto.descripcion = updateRepuestoDto.descripcion;
    updatedRepuesto.proveedor = updateRepuestoDto.proveedor;
    updatedRepuesto.precio = updateRepuestoDto.precio;
    await this.repuestoRepository.update(existingRepuesto.id, updatedRepuesto);
    return await this.repuestoRepository.findOne({
      where: { id },
    });
  }

  async delete(id: number): Promise<void> {
    const existingEquipo = await this.repuestoRepository.findOne({
      where: { id },
    });
    if (!existingEquipo) {
      throw new Error('Equipo not found');
    }

    await this.repuestoRepository.remove(existingEquipo);
  }
}
