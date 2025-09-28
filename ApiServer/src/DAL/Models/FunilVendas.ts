import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import type { Cliente } from "./Cliente.js";
import type { HistoricoFunil } from "./HistoricoFunil.js";

import { Cliente as ClienteEntity } from "./Cliente.js";
import { HistoricoFunil as HistoricoFunilEntity } from "./HistoricoFunil.js";

@Entity("Funil_vendas")
export class FunilVendas {
  @PrimaryGeneratedColumn({ name: "funil_ID" }) 
  funil_ID!: number;

  @Column({ name: "estagio_nome", type: "varchar", length: 20 }) 
  estagio_nome!: string;

  @OneToMany(
    () => ClienteEntity,
    (cliente: Cliente) => cliente.funil
  )
  clientes?: Cliente[];

  @OneToMany(
    () => HistoricoFunilEntity,
    (historico: HistoricoFunil) => historico.funil
  )
  historico?: HistoricoFunil[];
}