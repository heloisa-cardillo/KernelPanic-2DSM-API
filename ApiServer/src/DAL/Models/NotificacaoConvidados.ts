import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";

// Importações apenas para tipos
import type { Notificacao } from "./Notificacao.js";
import type { FuncionariosConvidados } from "./FuncionariosConvidados.js";

// Importações reais para decorators
import { Notificacao as NotificacaoEntity } from "./Notificacao.js";
import { FuncionariosConvidados as FuncionariosConvidadosEntity } from "./FuncionariosConvidados.js";

@Entity()
export class NotificacaoConvidados {
  
  // Chave primária composta
  @PrimaryColumn({ type: "int" })
  funcionario_ID!: number;

  @PrimaryColumn({ type: "int" })
  evento_ID!: number;

  @PrimaryColumn({ type: "int" })
  notificacao_ID!: number;

  // Definindo a coluna de status com tipo boolean
  @Column({ type: "boolean" })
  status_leitura!: boolean;

  // Data de leitura, permitindo null
  @Column({ type: "timestamp", nullable: true })
  data_leitura?: Date | null;

  // A prioridade é uma string, mas com comprimento limitado
  @Column({ type: "varchar", length: 20 })
  prioridade!: string;

  // Relacionamento com a entidade Notificacao
  @ManyToOne(
    () => NotificacaoEntity,
    (notificacao: Notificacao) => notificacao.convidados
  )
  notificacao!: Notificacao;

  // Relacionamento com a entidade FuncionariosConvidados
  @ManyToOne(
    () => FuncionariosConvidadosEntity,
    (fc: FuncionariosConvidados) => fc.notificacoes
  )
  funcionarioConvidado!: FuncionariosConvidados;
}