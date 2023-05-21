import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Evaluacion } from './Evaluacion.entity';
import { DetalleReparacion } from './DetalleReparacion.entity';
import { Tecnico } from './Tecnico.entity';

@Entity({ name: 'reparaciones' })
export class Reparacion {
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
  costo_estimado: number;

  @OneToOne(() => Evaluacion)
  @JoinColumn()
  evaluacion: Evaluacion;

  @ManyToOne(() => Tecnico, (tecnico) => tecnico.reparaciones)
  tecnico: Tecnico;

  @OneToMany(
    () => DetalleReparacion,
    (detalles_reparacion) => detalles_reparacion.reparacion,
  )
  detalles_reparacion: DetalleReparacion[];
}
