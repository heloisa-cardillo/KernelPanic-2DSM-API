import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Cliente } from "./Cliente.js";
import { HistoricoFunil } from "./HistoricoFunil.js";

@Entity()
export class FunilVendas {
  @PrimaryGeneratedColumn()
  funil_ID!: number;

  @Column({ length: 20 })
  estagio_nome!: string;

  // Relacionamento 1:N com Cliente
  @OneToMany(() => Cliente, c => c.funil)
  clientes?: Cliente[];

  // Relacionamento 1:N com HistoricoFunil
  @OneToMany(() => HistoricoFunil, h => h.funil)
  historico?: HistoricoFunil[];
}
