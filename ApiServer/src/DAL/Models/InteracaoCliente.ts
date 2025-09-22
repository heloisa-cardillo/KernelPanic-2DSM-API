import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";

import type { Funcionario } from "./Funcionario.js";
import type { Cliente } from "./Cliente.js";
import type { AgendamentoInteracao } from "./AgendamentoInteracao.js";

// Importando as classes para uso nos decorators (sem `type` aqui)
import { Funcionario as FuncionarioEntity } from "./Funcionario.js";
import { Cliente as ClienteEntity } from "./Cliente.js";
import { AgendamentoInteracao as AgendamentoEntity } from "./AgendamentoInteracao.js";

@Entity()
export class InteracaoCliente {
  @PrimaryGeneratedColumn({ type: "int" })
  interacao_ID!: number; // Tipo explícito: number

  @Column({ type: "date" })
  data_interacao!: Date; // Tipo explícito: Date

  @Column({ type: "varchar", length: 20 })
  tipo_interacao!: string; // Tipo explícito: string

  @Column({ type: "varchar", length: 255 })
  relatorio_interacao!: string; // Tipo explícito: string

  @ManyToOne(
    () => FuncionarioEntity,
    (funcionario: Funcionario) => funcionario.interacoes
  )
  funcionario!: Funcionario; // Tipo explícito: Funcionario

  @ManyToOne(
    () => ClienteEntity,
    (cliente: Cliente) => cliente.interacoes
  )
  cliente!: Cliente; // Tipo explícito: Cliente

  @ManyToOne(
    () => AgendamentoEntity,
    (agendamento: AgendamentoInteracao) => agendamento.interacoes,
    { nullable: true }
  )
  agendamento?: AgendamentoInteracao; // Tipo explícito: AgendamentoInteracao | undefined (nullable)
}