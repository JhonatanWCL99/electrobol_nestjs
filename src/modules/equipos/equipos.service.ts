import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/entities/Cliente.entity';
import { Equipo } from 'src/entities/Equipo.entity';
import { Repository } from 'typeorm';
import { CreateEquipoDto } from './dtos/create-equipo';
import { UpdateEquipoDto } from './dtos/update-equipo';

@Injectable()
export class EquipoService {
  constructor(
    @InjectRepository(Equipo)
    private readonly equipoRepository: Repository<Equipo>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  findAll(): Promise<Equipo[]> {
    return this.equipoRepository.find({ relations: ['cliente'] });
  }

  async findOne(id: number): Promise<Equipo> {
    return await this.equipoRepository.findOne({
      where: {
        id,
      },
      relations: ['cliente'],
    });
  }

  async create(equipoCreateDto: CreateEquipoDto): Promise<Equipo> {
    const cliente = await this.clienteRepository.findOne({
      where: { id: equipoCreateDto.clienteId },
    });

    const equipo = new Equipo();
    equipo.nro_serie = equipoCreateDto.nro_serie;
    equipo.modelo = equipoCreateDto.modelo;
    equipo.marca = equipoCreateDto.marca;
    equipo.fecha = equipoCreateDto.fecha;
    equipo.garantia = equipoCreateDto.garantia;
    equipo.cliente = cliente;
    return await this.equipoRepository.save(equipo);
  }

  async update(id: number, updatedEquipoDto: UpdateEquipoDto): Promise<Equipo> {
    const existingEquipo = await this.equipoRepository.findOne({
      where: { id },
      relations: ['cliente'],
    });
    if (!existingEquipo) {
      throw new Error('Equipo not found');
    }
    const existingCliente = await this.clienteRepository.findOne({
      where: { id: updatedEquipoDto.clienteId },
    });

    if (!existingCliente) {
      throw new Error('Equipo not found');
    }

    const updatedEquipo = new Equipo();
    updatedEquipo.nro_serie = updatedEquipoDto.nro_serie;
    updatedEquipo.modelo = updatedEquipoDto.modelo;
    updatedEquipo.marca = updatedEquipoDto.marca;
    updatedEquipo.fecha = updatedEquipoDto.fecha;
    updatedEquipo.garantia = updatedEquipoDto.garantia;
    updatedEquipo.cliente = existingCliente;
    await this.equipoRepository.update(existingEquipo.id, updatedEquipo);
    return await this.equipoRepository.findOne({
      where: { id },
      relations: ['cliente'],
    });
  }

  async delete(id: number): Promise<void> {
    const existingEquipo = await this.equipoRepository.findOne({
      where: { id },
    });
    if (!existingEquipo) {
      throw new Error('Equipo not found');
    }

    await this.equipoRepository.remove(existingEquipo);
  }
}
