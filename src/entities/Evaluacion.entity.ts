import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Equipo } from './Equipo.entity';
import { Tecnico } from './Tecnico.entity';

@Entity({ name: 'evaluaciones' })
export class Evaluacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha_inicio: Date;

  @Column({ nullable: true })
  fecha_fin: Date;

  @Column()
  estado: string;

  @Column()
  descripcion: string;

  @Column()
  costo_inicial: number;

  @ManyToOne(() => Tecnico, (tecnico) => tecnico.reparaciones)
  tecnico: Tecnico;

  @ManyToOne(() => Equipo, (equipo) => equipo.evaluaciones)
  equipo: Equipo;
}
