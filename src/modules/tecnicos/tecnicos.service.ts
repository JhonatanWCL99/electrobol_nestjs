import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from 'src/entities/Persona.entity';
import { Repository } from 'typeorm';
import { Tecnico } from 'src/entities/Tecnico.entity';
import { CreateTecnicoDto } from './dtos/create-tecnico';
import { UpdateTecnicoDto } from './dtos/update-tecnico';

@Injectable()
export class TecnicoService {
  constructor(
    @InjectRepository(Tecnico)
    private readonly tecnicoRepository: Repository<Tecnico>,
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

  findAll(): Promise<Tecnico[]> {
    return this.tecnicoRepository.find({ relations: ['persona'] });
  }

  async findOne(id: number): Promise<Tecnico> {
    return await this.tecnicoRepository.findOne({
      where: {
        id,
      },
      relations: ['persona'],
    });
  }

  async create(tecnicoCreateDto: CreateTecnicoDto): Promise<Tecnico> {
    const persona = new Persona();
    persona.nombre = tecnicoCreateDto.nombre;
    persona.correo = tecnicoCreateDto.correo;
    persona.telefono = tecnicoCreateDto.telefono;
    await this.personaRepository.save(persona);
    const tecnico = new Tecnico();
    tecnico.especialidad = tecnicoCreateDto.especialidad;
    tecnico.persona = persona;
    return await this.tecnicoRepository.save(tecnico);
  }

  async update(
    id: number,
    updatedTecnicoDto: UpdateTecnicoDto,
  ): Promise<Tecnico> {
    const existingTecnico = await this.tecnicoRepository.findOne({
      where: { id },
      relations: ['persona'],
    });
    if (!existingTecnico) {
      throw new Error('Tecnico not found');
    }

    const existingPersona = await this.personaRepository.findOne({
      where: { id: existingTecnico.persona.id },
    });

    if (!existingPersona) {
      throw new Error('Tecnico not found');
    }

    const updatedPersona = new Persona();
    updatedPersona.nombre = updatedTecnicoDto.nombre;
    updatedPersona.correo = updatedTecnicoDto.correo;
    updatedPersona.telefono = updatedTecnicoDto.telefono;
    await this.personaRepository.update(existingPersona.id, updatedPersona);
    const updatedCliente = new Tecnico();
    updatedCliente.especialidad = updatedTecnicoDto.especialidad;
    await this.tecnicoRepository.update(existingTecnico.id, updatedCliente);
    return await this.tecnicoRepository.findOne({
      where: { id },
      relations: ['persona'],
    });
  }

  async delete(id: number): Promise<void> {
    const existingTecnico = await this.tecnicoRepository.findOne({
      where: { id },
    });
    if (!existingTecnico) {
      throw new Error('Tecnico not found');
    }

    await this.tecnicoRepository.remove(existingTecnico);
  }
}
