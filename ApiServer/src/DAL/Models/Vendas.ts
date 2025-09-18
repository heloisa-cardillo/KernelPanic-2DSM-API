import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Cliente } from "./Cliente";
import { Funcionario } from "./Funcionario";

@Entity()
export class Vendas {
  @PrimaryGeneratedColumn()
  venda_ID!: number;

  @Column({ type: "date" })
  data_venda!: Date;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  valor_total!: number;

  @Column({ length: 20 })
  status!: string;

  @ManyToOne(() => Cliente, c => c.vendas)
  @JoinColumn({ name: "cliente_ID" })  
  cliente!: Cliente;

  @ManyToOne(() => Funcionario, f => f.vendas)
  @JoinColumn({ name: "funcionario_ID" }) 
  funcionario!: Funcionario;
}