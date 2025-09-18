import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Cliente } from "./Cliente";
import { FunilVendas } from "./FunilVendas";

@Entity("historicofunil")
export class HistoricoFunil {
  @PrimaryGeneratedColumn()
  historico_ID!: number;

  @Column({ type: "timestamp" })
  data_movimentacao!: Date;

  @ManyToOne(() => Cliente, c => c.historico)
  @JoinColumn({ name: "cliente_ID" })
  cliente!: Cliente;

  @ManyToOne(() => FunilVendas, f => f.historico)
  @JoinColumn({ name: "funil_venda_ID" }) 
  funil!: FunilVendas;
}