import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";

// Importações apenas para tipos
import type { Notificacao } from "./Notificacao.js";
import type { FuncionariosConvidados } from "./FuncionariosConvidados.js";

// Importações reais para decorators
import { Notificacao as NotificacaoEntity } from "./Notificacao.js";
import { FuncionariosConvidados as FuncionariosConvidadosEntity } from "./FuncionariosConvidados.js";

@Entity("Notificacao_convidados") // Nome da tabela
export class NotificacaoConvidados {
  // Chave primária composta com nomes explícitos
  @PrimaryColumn({ name: "funcionario_ID", type: "int" })
  funcionario_ID!: number;

  @PrimaryColumn({ name: "evento_ID", type: "int" })
  evento_ID!: number;

  @PrimaryColumn({ name: "notificacao_ID", type: "int" })
  notificacao_ID!: number;

  // Definindo a coluna de status com tipo boolean
  @Column({ name: "status_leitura", type: "boolean" })
  status_leitura!: boolean;

  // Data de leitura, permitindo null
  @Column({ name: "data_leitura", type: "timestamp", nullable: true })
  data_leitura?: Date | null;

  // A prioridade é uma string, mas com comprimento limitado
  @Column({ name: "prioridade", type: "varchar", length: 20 })
  prioridade!: string;

  // Relacionamento com a entidade Notificacao
  @ManyToOne(
    () => NotificacaoEntity,
    (notificacao: Notificacao) => notificacao.convidados
  )
  @JoinColumn({ name: "notificacao_ID" })
  notificacao!: Notificacao;

  // Relacionamento com a entidade FuncionariosConvidados
  @ManyToOne(
    () => FuncionariosConvidadosEntity,
    (fc: FuncionariosConvidados) => fc.notificacoes
  )
  @JoinColumn([
    { name: "funcionario_ID", referencedColumnName: "funcionario_ID" },
    { name: "evento_ID", referencedColumnName: "evento_ID" },
  ])
  funcionarioConvidado!: FuncionariosConvidados;
}