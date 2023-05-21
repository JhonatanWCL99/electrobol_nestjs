import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Rol } from './Rol.entity';

@Entity({ name: 'permisos' })
export class Permiso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Rol, (rol) => rol.permisos)
  rol: Rol;
}
