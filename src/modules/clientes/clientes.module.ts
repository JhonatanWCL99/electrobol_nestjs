import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/entities/Cliente.entity';
import { ClienteController } from './clientes.controller';
import { ClienteService } from './clientes.service';
import { Persona } from 'src/entities/Persona.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Persona])],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClientesModule {}
