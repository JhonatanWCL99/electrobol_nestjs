import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reparacion } from './Reparacion.entity';
import { Repuesto } from './Repuesto.entity';

@Entity({ name: 'detalles_reparacion' })
export class DetalleReparacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cantidad_utilizada: number;

  @Column()
  descripcion: string;

  @ManyToOne(() => Reparacion, (reparacion) => reparacion.detalles_reparacion)
  reparacion: Reparacion;

  @OneToOne(() => Repuesto)
  @JoinColumn()
  repuesto: Repuesto;
}
