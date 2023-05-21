import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Inventario } from './Inventario.entity';
import { Pedido } from './Pedido.entity';

@Entity({ name: 'repuestos' })
export class Repuesto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  proveedor: string;

  @Column()
  precio: number;

  @OneToMany(() => Inventario, (inventario) => inventario.repuesto)
  inventarios: Inventario[];

  @OneToMany(() => Pedido, (pedido) => pedido.repuesto)
  pedidos: Pedido[];
}
