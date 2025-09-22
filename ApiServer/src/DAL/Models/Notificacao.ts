import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";

// Importação apenas para tipos (não gera código JS)
import type { EventoTreinamento } from "./EventoTreinamento.js";
import type { NotificacaoConvidados } from "./NotificacaoConvidados.js";

// Importação real para decorators
import { EventoTreinamento as EventoTreinamentoEntity } from "./EventoTreinamento.js";
import { NotificacaoConvidados as NotificacaoConvidadosEntity } from "./NotificacaoConvidados.js";

@Entity()
export class Notificacao {
  @PrimaryGeneratedColumn({ type: "int" })
  notificacao_ID!: number; // Tipo explícito: number (ID gerado automaticamente)

  @Column({ type: "varchar", length: 100 })
  titulo_notificacao!: string; // Tipo explícito: string

  @Column({ type: "longtext", nullable: true })
  corpo_notificacao?: string | null; // Tipo explícito: string | null (nullable)

  @ManyToOne(
    () => EventoTreinamentoEntity,
    (evento: EventoTreinamento) => evento.notificacoes
  )
  evento!: EventoTreinamento; // Tipo explícito: EventoTreinamento

  @OneToMany(
    () => NotificacaoConvidadosEntity,
    (nc: NotificacaoConvidados) => nc.notificacao
  )
  convidados?: NotificacaoConvidados[]; // Tipo explícito: NotificacaoConvidados[] | undefined (nullable)
}