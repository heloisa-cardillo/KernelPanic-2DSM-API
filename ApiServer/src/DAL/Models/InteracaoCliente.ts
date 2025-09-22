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
  @PrimaryGeneratedColumn()
  interacao_ID!: number;

  @Column({ type: "date" })
  data_interacao!: Date;

  @Column({ length: 20 })
  tipo_interacao!: string;

  @Column({ length: 255 })
  relatorio_interacao!: string;

  @ManyToOne(
    () => FuncionarioEntity,
    funcionario => funcionario.interacoes
  )
  funcionario!: Funcionario;

  @ManyToOne(
    () => ClienteEntity,
    cliente => cliente.interacoes
  )
  cliente!: Cliente;

  @ManyToOne(
    () => AgendamentoEntity,
    agendamento => agendamento.interacoes,
    { nullable: true }
  )
  agendamento?: AgendamentoInteracao;
}