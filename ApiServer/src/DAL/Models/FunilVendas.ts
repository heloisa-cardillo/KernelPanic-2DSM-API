import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Cliente } from "./Cliente";
import { HistoricoFunil } from "./HistoricoFunil";

@Entity()
export class FunilVendas {
  @PrimaryGeneratedColumn()
  funil_ID!: number;

  @Column({ length: 20 })
  estagio_nome!: string;

  @OneToMany(() => Cliente, c => c.funil)
  clientes?: Cliente[];

  @OneToMany(() => HistoricoFunil, h => h.funil)
  historico?: HistoricoFunil[];
}