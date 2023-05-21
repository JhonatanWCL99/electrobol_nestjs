import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from './Usuario.entity';

@Entity({ name: 'personas' })
export class Persona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  telefono: number;

  @Column()
  correo: string;

  @OneToOne(() => Usuario, { nullable: true })
  @JoinColumn()
  usuario: Usuario;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
