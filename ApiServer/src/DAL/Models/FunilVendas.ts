import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

// Importações só para tipagem (TypeScript)
import type { Cliente } from "./Cliente.js";
import type { HistoricoFunil } from "./HistoricoFunil.js";

// Importações reais para os decorators do TypeORM
import { Cliente as ClienteEntity } from "./Cliente.js";
import { HistoricoFunil as HistoricoFunilEntity } from "./HistoricoFunil.js";

@Entity("Funil_vendas") // Nome da tabela explícito
export class FunilVendas {
  @PrimaryGeneratedColumn({ name: "funil_ID" }) // Coluna de PK auto incremental
  funil_ID!: number;

  @Column({ name: "estagio_nome", type: "varchar", length: 20 }) // Coluna para nome do estágio
  estagio_nome!: string;

  // Relacionamento 1:N com Cliente (um funil pode ter vários clientes)
  @OneToMany(
    () => ClienteEntity,
    (cliente: Cliente) => cliente.funil
  )
  clientes?: Cliente[];

  // Relacionamento 1:N com HistoricoFunil (um funil pode ter vários históricos)
  @OneToMany(
    () => HistoricoFunilEntity,
    (historico: HistoricoFunil) => historico.funil
  )
  historico?: HistoricoFunil[];
}