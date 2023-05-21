import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Persona } from './Persona.entity';
import { Reparacion } from './Reparacion.entity';
import { Evaluacion } from './Evaluacion.entity';
@Entity({ name: 'tecnicos' })
export class Tecnico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  especialidad: string;

  @OneToOne(() => Persona)
  @JoinColumn()
  persona: Persona;

  @OneToMany(() => Reparacion, (reparacion) => reparacion.tecnico)
  reparaciones: Reparacion[];

  @OneToMany(() => Evaluacion, (evaluacion) => evaluacion.tecnico)
  evaluaciones: Evaluacion[];
}
