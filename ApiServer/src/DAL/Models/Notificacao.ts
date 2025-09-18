import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { EventoTreinamento } from "./EventoTreinamento.js";
import { NotificacaoConvidados } from "./NotificacaoConvidados.js";

@Entity()
export class Notificacao {
  @PrimaryGeneratedColumn()
  notificacao_ID!: number;

  @Column({ length: 100 })
  titulo_notificacao!: string;

  @Column({ type: "longtext", nullable: true })
  corpo_notificacao?: string;

  @ManyToOne(() => EventoTreinamento, (evento) => evento.notificacoes)
  evento!: EventoTreinamento;

  @OneToMany(() => NotificacaoConvidados, nc => nc.notificacao)
  convidados?: NotificacaoConvidados[];
}