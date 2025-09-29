import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";

// Importação só para tipos (TypeScript)
import type { EventoTreinamento } from "./EventoTreinamento.js";
import type { NotificacaoConvidados } from "./NotificacaoConvidados.js";

// Importação real (TypeORM decorators)
import { EventoTreinamento as EventoTreinamentoEntity } from "./EventoTreinamento.js";
import { NotificacaoConvidados as NotificacaoConvidadosEntity } from "./NotificacaoConvidados.js";

@Entity("Notificacao") // Define o nome da tabela no banco de dados
export class Notificacao {
  @PrimaryGeneratedColumn({ name: "notificacao_ID" }) 
  // Chave primária auto-incrementada da notificação
  notificacao_ID!: number;

  @Column({ name: "titulo_notificacao", type: "varchar", length: 100 }) 
  // Título da notificação (até 100 caracteres)
  titulo_notificacao!: string;

  @Column({ name: "corpo_notificacao", type: "longtext", nullable: true }) 
  // Conteúdo/corpo da notificação, pode ser texto longo e pode ser nulo
  corpo_notificacao?: string | null;

  @ManyToOne(
    () => EventoTreinamentoEntity,
    (evento: EventoTreinamento) => evento.notificacoes
  )
  @JoinColumn({ name: "evento_ID" }) 
  // Relacionamento muitos-para-um com EventoTreinamento
  // Cada notificação pertence a um evento de treinamento
  evento!: EventoTreinamento;

  @OneToMany(
    () => NotificacaoConvidadosEntity,
    (nc: NotificacaoConvidados) => nc.notificacao
  )
  // Relacionamento um-para-muitos com NotificacaoConvidados
  // Uma notificação pode ter vários convidados associados
  convidados?: NotificacaoConvidados[];
}