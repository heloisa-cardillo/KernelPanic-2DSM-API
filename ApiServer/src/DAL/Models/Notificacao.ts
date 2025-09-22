import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";

// Importação apenas para tipos (não gera código JS)
import type { EventoTreinamento } from "./EventoTreinamento.js";
import type { NotificacaoConvidados } from "./NotificacaoConvidados.js";

// Importação real para decorators
import { EventoTreinamento as EventoTreinamentoEntity } from "./EventoTreinamento.js";
import { NotificacaoConvidados as NotificacaoConvidadosEntity } from "./NotificacaoConvidados.js";

@Entity()
export class Notificacao {
  @PrimaryGeneratedColumn()
  notificacao_ID!: number;

  @Column({ length: 100 })
  titulo_notificacao!: string;

  @Column({ type: "longtext", nullable: true })
  corpo_notificacao?: string;

  @ManyToOne(
    () => EventoTreinamentoEntity,
    (evento: EventoTreinamento) => evento.notificacoes
  )
  evento!: EventoTreinamento;

  @OneToMany(
    () => NotificacaoConvidadosEntity,
    (nc: NotificacaoConvidados) => nc.notificacao
  )
  convidados?: NotificacaoConvidados[];
}