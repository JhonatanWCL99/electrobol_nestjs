import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reparacion } from 'src/entities/Reparacion.entity';
import { DetalleReparacion } from 'src/entities/DetalleReparacion.entity';
import { UpdateReparacionDto } from './dtos/update-reparacion';

@Injectable()
export class ReparacionService {
  constructor(
    @InjectRepository(Reparacion)
    private readonly reparacionRepository: Repository<Reparacion>,
    @InjectRepository(DetalleReparacion)
    private readonly detalleReparacionRepository: Repository<DetalleReparacion>,
  ) {}

  findAll(): Promise<Reparacion[]> {
    return this.reparacionRepository.find({
      relations: ['evaluacion', 'tecnico.persona', 'detalles_reparacion'],
    });
  }

  async findOne(id: number): Promise<Reparacion> {
    return await this.reparacionRepository.findOne({
      where: {
        id,
      },
      relations: ['evaluacion', 'tecnico', 'detalles_reparacion'],
    });
  }

  async update(
    id: number,
    updatedReparacionDto: UpdateReparacionDto,
  ): Promise<Reparacion> {
    const existingReparacion = await this.reparacionRepository.findOne({
      where: { id },
      relations: ['tecnico'],
    });
    if (!existingReparacion) {
      throw new Error('Reparacion not found');
    }
    const updatedReparacion = new Reparacion();
    updatedReparacion.fecha_fin = updatedReparacionDto.fecha_fin;
    updatedReparacion.estado = 'Finalizado';
    updatedReparacion.descripcion = updatedReparacionDto.descripcion;
    await this.reparacionRepository.update(
      existingReparacion.id,
      updatedReparacion,
    );
    return await this.reparacionRepository.findOne({
      where: { id },
      relations: ['tecnico'],
    });
  }

  async delete(id: number): Promise<void> {
    const existingEvaluacion = await this.reparacionRepository.findOne({
      where: { id },
    });
    if (!existingEvaluacion) {
      throw new Error('Equipo not found');
    }

    await this.reparacionRepository.remove(existingEvaluacion);
  }
}
