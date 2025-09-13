import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
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
  cliente!: Cliente;

  @ManyToOne(() => Funcionario, f => f.vendas)
  funcionario!: Funcionario;
}