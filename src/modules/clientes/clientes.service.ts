import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateClienteDto } from 'src/modules/clientes/dtos/update-cliente';
import { Cliente } from 'src/entities/Cliente.entity';
import { Persona } from 'src/entities/Persona.entity';
import { Repository } from 'typeorm';
import { CreateClienteDto } from './dtos/create-cliente';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

  findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find({ relations: ['persona', 'equipos'] });
  }

  async findOne(id: number): Promise<Cliente> {
    return await this.clienteRepository.findOne({
      where: {
        id,
      },
      relations: ['persona', 'equipos'],
    });
  }

  async create(clienteCreateDto: CreateClienteDto): Promise<Cliente> {
    const persona = new Persona();
    persona.nombre = clienteCreateDto.nombre;
    persona.correo = clienteCreateDto.correo;
    persona.telefono = clienteCreateDto.telefono;
    await this.personaRepository.save(persona);
    const cliente = new Cliente();
    cliente.tipo_cliente = clienteCreateDto.tipo_cliente;
    cliente.persona = persona;
    return await this.clienteRepository.save(cliente);
  }

  async update(
    id: number,
    updatedClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    const existingCliente = await this.clienteRepository.findOne({
      where: { id },
      relations: ['persona'],
    });
    if (!existingCliente) {
      throw new Error('Cliente not found');
    }
    const existingPersona = await this.personaRepository.findOne({
      where: { id: existingCliente.persona.id },
    });

    if (!existingPersona) {
      throw new Error('Cliente not found');
    }

    const updatedPersona = new Persona();
    updatedPersona.nombre = updatedClienteDto.nombre;
    updatedPersona.correo = updatedClienteDto.correo;
    updatedPersona.telefono = updatedClienteDto.telefono;
    await this.personaRepository.update(existingPersona.id, updatedPersona);
    const updatedCliente = new Cliente();
    updatedCliente.tipo_cliente = updatedClienteDto.tipo_cliente;
    await this.clienteRepository.update(existingCliente.id, updatedCliente);
    return await this.clienteRepository.findOne({
      where: { id },
      relations: ['persona'],
    });
  }

  async delete(id: number): Promise<void> {
    const existingCliente = await this.clienteRepository.findOne({
      where: { id },
    });
    if (!existingCliente) {
      throw new Error('Cliente not found');
    }

    await this.clienteRepository.remove(existingCliente);
  }
}
