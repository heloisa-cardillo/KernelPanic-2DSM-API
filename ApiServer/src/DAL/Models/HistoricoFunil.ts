import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Cliente } from "./Cliente.js";
import { FunilVendas } from "./FunilVendas.js";

@Entity()
export class HistoricoFunil {
  @PrimaryGeneratedColumn()
  historico_ID!: number;

  @Column({ type: "timestamp" })
  data_movimentacao!: Date;

  @ManyToOne(() => Cliente, c => c.historico)
  cliente!: Cliente;

  @ManyToOne(() => FunilVendas, f => f.historico)
  funil!: FunilVendas;
}