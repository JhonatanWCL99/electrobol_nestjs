import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Repuesto } from './Repuesto.entity';

@Entity({ name: 'pedidos' })
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha_pedido: Date;

  @Column()
  cantidad: number;

  @Column()
  estado: string;

  @ManyToOne(() => Repuesto, (repuesto) => repuesto.inventarios)
  repuesto: Repuesto;
}
