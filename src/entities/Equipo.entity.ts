import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Cliente } from './Cliente.entity';
import { Evaluacion } from './Evaluacion.entity';

@Entity({ name: 'equipos' })
export class Equipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nro_serie: number;

  @Column()
  modelo: string;

  @Column()
  marca: string;

  @Column()
  fecha: string;

  @Column()
  garantia: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.equipos)
  cliente: Cliente;

  @OneToMany(() => Evaluacion, (evaluacion) => evaluacion.equipo)
  evaluaciones: Evaluacion[];
}
