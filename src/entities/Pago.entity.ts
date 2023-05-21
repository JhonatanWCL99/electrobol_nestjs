import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Cliente } from './Cliente.entity';

@Entity({ name: 'pagos' })
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha_pago: Date;

  @Column()
  monto: number;

  @Column()
  metodo_pago: string;

  @Column()
  estado_pago: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Cliente, (cliente) => cliente.pagos)
  cliente: Cliente;
}
