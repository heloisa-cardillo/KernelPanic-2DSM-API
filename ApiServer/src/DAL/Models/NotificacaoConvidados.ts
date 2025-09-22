import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";

// Importação apenas para tipos
import type { Notificacao } from "./Notificacao.js";
import type { FuncionariosConvidados } from "./FuncionariosConvidados.js";

// Importação real para decorators
import { Notificacao as NotificacaoEntity } from "./Notificacao.js";
import { FuncionariosConvidados as FuncionariosConvidadosEntity } from "./FuncionariosConvidados.js";

@Entity()
export class NotificacaoConvidados {
  @PrimaryColumn()
  funcionario_ID!: number;

  @PrimaryColumn()
  evento_ID!: number;

  @PrimaryColumn()
  notificacao_ID!: number;

  @Column({ type: "boolean" })
  status_leitura!: boolean;

  @Column({ type: "timestamp", nullable: true })
  data_leitura?: Date;

  @Column({ length: 20 })
  prioridade!: string;

  @ManyToOne(
    () => NotificacaoEntity,
    (notificacao: Notificacao) => notificacao.convidados
  )
  notificacao!: Notificacao;

  @ManyToOne(
    () => FuncionariosConvidadosEntity,
    (fc: FuncionariosConvidados) => fc.notificacoes
  )
  funcionarioConvidado!: FuncionariosConvidados;
}