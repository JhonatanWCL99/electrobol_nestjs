import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipo } from 'src/entities/Equipo.entity';
import { Evaluacion } from 'src/entities/Evaluacion.entity';
import { Like, Repository } from 'typeorm';
import { CreateEvaluacionDto } from './dtos/create-evaluacion';
import { UpdateEvaluacionDto } from './dtos/update-evaluacion';
import { Reparacion } from 'src/entities/Reparacion.entity';
import { Tecnico } from 'src/entities/Tecnico.entity';

@Injectable()
export class EvaluacionService {
  constructor(
    @InjectRepository(Equipo)
    private readonly equipoRepository: Repository<Equipo>,
    @InjectRepository(Evaluacion)
    private readonly evaluacionRepository: Repository<Evaluacion>,
    @InjectRepository(Reparacion)
    private readonly reparacionRepository: Repository<Reparacion>,
    @InjectRepository(Tecnico)
    private readonly tecnicoRepository: Repository<Tecnico>,
  ) {}

  findAll(): Promise<Evaluacion[]> {
    return this.evaluacionRepository.find({ relations: ['equipo', 'tecnico'] });
  }

  async findOne(id: number): Promise<Evaluacion> {
    return await this.evaluacionRepository.findOne({
      where: {
        id,
      },
      relations: ['equipo', 'tecnico'],
    });
  }

  async create(evaluacionCreateDto: CreateEvaluacionDto): Promise<Evaluacion> {
    const equipo = await this.equipoRepository.findOne({
      where: { id: evaluacionCreateDto.equipoId },
    });

    const tecnico = await this.tecnicoRepository.findOne({
      where: { id: evaluacionCreateDto.tecnicoId },
    });

    const evaluacion = new Evaluacion();
    evaluacion.fecha_inicio = new Date();
    evaluacion.estado = 'Progreso';
    evaluacion.descripcion = evaluacionCreateDto.descripcion;
    evaluacion.costo_inicial = evaluacionCreateDto.costo_inicial;
    evaluacion.equipo = equipo;
    evaluacion.tecnico = tecnico;
    return await this.evaluacionRepository.save(evaluacion);
  }

  async update(
    id: number,
    updatedEvaluacionDto: UpdateEvaluacionDto,
  ): Promise<Evaluacion> {
    const existingEvaluacion = await this.evaluacionRepository.findOne({
      where: { id },
      relations: ['equipo', 'tecnico'],
    });
    if (!existingEvaluacion) {
      throw new Error('Evaluacion not found');
    }

    const updatedEvaluacion = new Evaluacion();
    updatedEvaluacion.fecha_fin = updatedEvaluacionDto.fecha_fin;
    updatedEvaluacion.estado = 'Finalizado';
    updatedEvaluacion.descripcion = updatedEvaluacionDto.descripcion;
    await this.evaluacionRepository.update(
      existingEvaluacion.id,
      updatedEvaluacion,
    );
    const newReparacion = new Reparacion();
    newReparacion.fecha_inicio = new Date();
    newReparacion.estado = 'Reparacion';
    newReparacion.descripcion = updatedEvaluacion.descripcion;
    newReparacion.costo_estimado = 0;
    newReparacion.tecnico = existingEvaluacion.tecnico;
    newReparacion.evaluacion = existingEvaluacion;

    await this.reparacionRepository.save(newReparacion);

    return await this.evaluacionRepository.findOne({
      where: { id },
      relations: ['equipo'],
    });
  }

  async delete(id: number): Promise<void> {
    const existingEvaluacion = await this.evaluacionRepository.findOne({
      where: { id },
    });
    if (!existingEvaluacion) {
      throw new Error('Equipo not found');
    }

    await this.evaluacionRepository.remove(existingEvaluacion);
  }

  async buscarEvaluacionesYReparacionesPorTecnico(
    tecnico: string,
  ): Promise<Tecnico> {
    console.log('tecnico');
    console.log(tecnico);
    // Buscar el técnico en base al criterio de búsqueda
    const existingTecnico = await this.tecnicoRepository.findOne({
      where: {
        persona: {
          nombre: Like(`%${tecnico}%`),
        },
      },
      relations: ['persona', 'reparaciones', 'evaluaciones'],
    });
    console.log('existingTecnico');
    console.log(existingTecnico);
    if (!existingTecnico) {
      throw new Error('Tecnico not found');
    }

    return existingTecnico;
  }
}
