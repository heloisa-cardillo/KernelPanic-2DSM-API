import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

// Importação apenas para tipos (não gera código JS)
import type { Cliente } from "./Cliente.js";
import type { HistoricoFunil } from "./HistoricoFunil.js";

// Importação real para decorators
import { Cliente as ClienteEntity } from "./Cliente.js";
import { HistoricoFunil as HistoricoFunilEntity } from "./HistoricoFunil.js";

@Entity()
export class FunilVendas {
  @PrimaryGeneratedColumn({ type: "int" })
  funil_ID!: number; // Tipo explícito: number (ID gerado automaticamente)

  @Column({ type: "varchar", length: 20 })
  estagio_nome!: string; // Tipo explícito: string

  // Relacionamento 1:N com Cliente
  @OneToMany(
    () => ClienteEntity,
    (cliente: Cliente) => cliente.funil
  )
  clientes?: Cliente[]; // Tipo explícito: Cliente[] | undefined (nullable)

  // Relacionamento 1:N com HistoricoFunil
  @OneToMany(
    () => HistoricoFunilEntity,
    (historico: HistoricoFunil) => historico.funil
  )
  historico?: HistoricoFunil[]; // Tipo explícito: HistoricoFunil[] | undefined (nullable)
}