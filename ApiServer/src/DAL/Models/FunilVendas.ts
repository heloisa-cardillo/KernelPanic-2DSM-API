import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

// Importação apenas para tipos (não gera código JS)
import type { Cliente } from "./Cliente.js";
import type { HistoricoFunil } from "./HistoricoFunil.js";

// Importação real para decorators
import { Cliente as ClienteEntity } from "./Cliente.js";
import { HistoricoFunil as HistoricoFunilEntity } from "./HistoricoFunil.js";

@Entity("Funil_vendas") // Nome da tabela
export class FunilVendas {
  @PrimaryGeneratedColumn({ name: "funil_ID" }) // Nome da coluna de ID
  funil_ID!: number;

  @Column({ name: "estagio_nome", type: "varchar", length: 20 }) // Nome da coluna
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