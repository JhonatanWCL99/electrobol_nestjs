import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Repuesto } from './Repuesto.entity';

@Entity({ name: 'inventarios' })
export class Inventario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha_inventario: Date;

  @Column()
  cantidad: number;

  @Column()
  estado: string;

  @ManyToOne(() => Repuesto, (repuesto) => repuesto.inventarios)
  repuesto: Repuesto;
}
