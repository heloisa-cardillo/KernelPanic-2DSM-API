import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";

// Importações apenas para tipos
import type { Notificacao } from "./Notificacao.js";
import type { FuncionariosConvidados } from "./FuncionariosConvidados.js";

// Importações reais para decorators
import { Notificacao as NotificacaoEntity } from "./Notificacao.js";
import { FuncionariosConvidados as FuncionariosConvidadosEntity } from "./FuncionariosConvidados.js";

@Entity("Notificacao_convidados") // Define o nome da tabela no banco de dados
export class NotificacaoConvidados {
  // Parte da chave primária composta: ID do funcionário convidado
  @PrimaryColumn({ name: "funcionario_ID", type: "int" })
  funcionario_ID!: number;

  // Parte da chave primária composta: ID do evento relacionado
  @PrimaryColumn({ name: "evento_ID", type: "int" })
  evento_ID!: number;

  // Parte da chave primária composta: ID da notificação associada
  @PrimaryColumn({ name: "notificacao_ID", type: "int" })
  notificacao_ID!: number;

  // Indica se a notificação foi lida (true/false)
  @Column({ name: "status_leitura", type: "boolean" })
  status_leitura!: boolean;

  // Data e hora em que a notificação foi lida, pode ser nula se não lida ainda
  @Column({ name: "data_leitura", type: "timestamp", nullable: true })
  data_leitura?: Date | null;

  // Prioridade da notificação (ex: "alta", "media", "baixa")
  @Column({ name: "prioridade", type: "varchar", length: 20 })
  prioridade!: string;

  // Relacionamento muitos-para-um com a entidade Notificacao
  // Cada registro pertence a uma notificação específica
  @ManyToOne(
    () => NotificacaoEntity,
    (notificacao: Notificacao) => notificacao.convidados
  )
  @JoinColumn({ name: "notificacao_ID" })
  notificacao!: Notificacao;

  // Relacionamento muitos-para-um com a entidade FuncionariosConvidados
  // Associa o convidado funcionário a este registro, chave composta usada para o join
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