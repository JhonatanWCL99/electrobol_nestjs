import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Persona } from './Persona.entity';
import { Equipo } from './Equipo.entity';
import { Pago } from './Pago.entity';

@Entity({ name: 'clientes' })
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo_cliente: string;

  @OneToOne(() => Persona)
  @JoinColumn()
  persona: Persona;

  @OneToMany(() => Equipo, (equipo) => equipo.cliente)
  equipos: Equipo[];

  @OneToMany(() => Pago, (pago) => pago.cliente)
  pagos: Pago[];
}
