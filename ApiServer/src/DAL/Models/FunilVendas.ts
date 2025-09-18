import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { Cliente } from "./Cliente";
import { HistoricoFunil } from "./HistoricoFunil";

@Entity("funilvendas")
export class FunilVendas {
  @PrimaryGeneratedColumn()
  @JoinColumn({ name: "funil_ID" })
  funil_ID!: number;

  @Column({ length: 20 })
  estagio_nome!: string;

  @OneToMany(() => Cliente, c => c.funil)
  clientes?: Cliente[];

  @OneToMany(() => HistoricoFunil, h => h.funil)
  historico?: HistoricoFunil[];
}