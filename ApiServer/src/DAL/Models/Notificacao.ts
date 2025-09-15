import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { EventoTreinamento } from "./EventoTreinamento";
import { NotificacaoConvidados } from "./NotificacaoConvidados";

@Entity()
export class Notificacao {
  @PrimaryGeneratedColumn()
  notificacao_ID!: number;

  @Column({ length: 100 })
  titulo_notificacao!: string;

  @Column({ type: "longtext", nullable: true })
  corpo_notificacao?: string;

  @ManyToOne(() => EventoTreinamento, e => e.notificacoes)
  evento!: EventoTreinamento;

  @OneToMany(() => NotificacaoConvidados, nc => nc.notificacao)
  convidados?: NotificacaoConvidados[];
}