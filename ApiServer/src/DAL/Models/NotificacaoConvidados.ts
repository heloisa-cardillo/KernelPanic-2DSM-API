import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Notificacao } from "./Notificacao.js";
import { FuncionariosConvidados } from "./FuncionariosConvidados.js";

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

  @ManyToOne(() => Notificacao, n => n.convidados)
  notificacao!: Notificacao;

  @ManyToOne(() => FuncionariosConvidados, fc => fc.notificacoes)
  funcionarioConvidado!: FuncionariosConvidados;
}