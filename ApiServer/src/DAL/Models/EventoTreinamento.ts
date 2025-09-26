import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn, // Para definir o nome da FK
} from "typeorm";

// ===== Importações de tipo (TS only) =====
import type { Funcionario } from "./Funcionario.js";
import type { FuncionariosConvidados } from "./FuncionariosConvidados.js";
import type { Notificacao } from "./Notificacao.js";

// ===== Importações reais para decorators =====
import { Funcionario as FuncionarioEntity } from "./Funcionario.js";
import { FuncionariosConvidados as FuncionariosConvidadosEntity } from "./FuncionariosConvidados.js";
import { Notificacao as NotificacaoEntity } from "./Notificacao.js";

@Entity("Evento_treinamento") // ===== Nome da tabela =====
export class EventoTreinamento {
  @PrimaryGeneratedColumn({ name: "evento_ID" }) // ===== PK =====
  evento_ID!: number;

  @Column({ name: "titulo", type: "varchar", length: 100 }) // ===== Título do evento =====
  titulo!: string;

  @Column({ name: "descricao", type: "longtext", nullable: true }) // ===== Descrição opcional =====
  descricao?: string;

  @Column({ name: "dataHora", type: "datetime" }) // ===== Data e hora do evento =====
  dataHora!: Date;

  @Column({ name: "duracao_horas", type: "float" }) // ===== Duração em horas =====
  duracao_horas!: number;

  @Column({ name: "evento_link", type: "longtext", nullable: true }) // ===== Link opcional do evento =====
  evento_link?: string;

  @Column({ name: "status", type: "varchar", length: 20 }) // ===== Status do evento =====
  status!: string;

  // ===== Relação ManyToOne: organizador (funcionario) =====
  @ManyToOne(() => FuncionarioEntity, (funcionario: Funcionario) => funcionario.eventosOrganizados)
  @JoinColumn({ name: "organizador_ID" }) // ===== FK organizador =====
  organizador_ID!: Funcionario;

  // ===== Relação OneToMany: convidados =====
  @OneToMany(() => FuncionariosConvidadosEntity, (fc: FuncionariosConvidados) => fc.evento)
  convidados?: FuncionariosConvidados[];

  // ===== Relação OneToMany: notificações =====
  @OneToMany(() => NotificacaoEntity, (notificacao: Notificacao) => notificacao.evento)
  notificacoes?: Notificacao[];
}