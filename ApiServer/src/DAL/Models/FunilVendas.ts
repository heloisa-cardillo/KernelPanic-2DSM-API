import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

// Importação apenas para tipos (não gera código JS)
import type { Cliente } from "./Cliente.js";
import type { HistoricoFunil } from "./HistoricoFunil.js";

// Importação real para decorators
import { Cliente as ClienteEntity } from "./Cliente.js";
import { HistoricoFunil as HistoricoFunilEntity } from "./HistoricoFunil.js";

@Entity()
export class FunilVendas {
  @PrimaryGeneratedColumn()
  funil_ID!: number;

  @Column({ length: 20 })
  estagio_nome!: string;

  // Relacionamento 1:N com Cliente
  @OneToMany(
    () => ClienteEntity,
    (cliente: Cliente) => cliente.funil
  )
  clientes?: Cliente[];

  // Relacionamento 1:N com HistoricoFunil
  @OneToMany(
    () => HistoricoFunilEntity,
    (historico: HistoricoFunil) => historico.funil
  )
  historico?: HistoricoFunil[];
}