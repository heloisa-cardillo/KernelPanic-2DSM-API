import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn, // Importe o JoinColumn
} from "typeorm";

// Importação apenas para tipos (não gera código JS)
import type { EventoTreinamento } from "./EventoTreinamento.js";
import type { NotificacaoConvidados } from "./NotificacaoConvidados.js";

// Importação real para decorators
import { EventoTreinamento as EventoTreinamentoEntity } from "./EventoTreinamento.js";
import { NotificacaoConvidados as NotificacaoConvidadosEntity } from "./NotificacaoConvidados.js";

@Entity("Notificacao") // Nome da tabela
export class Notificacao {
  @PrimaryGeneratedColumn({ name: "notificacao_ID" })
  notificacao_ID!: number;

  @Column({ name: "titulo_notificacao", type: "varchar", length: 100 })
  titulo_notificacao!: string;

  @Column({ name: "corpo_notificacao", type: "longtext", nullable: true })
  corpo_notificacao?: string | null;

  @ManyToOne(
    () => EventoTreinamentoEntity,
    (evento: EventoTreinamento) => evento.notificacoes
  )
  @JoinColumn({ name: "evento_ID" }) // Nome da chave estrangeira
  evento!: EventoTreinamento;

  @OneToMany(
    () => NotificacaoConvidadosEntity,
    (nc: NotificacaoConvidados) => nc.notificacao
  )
  convidados?: NotificacaoConvidados[];
}