import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn, // Adicione o JoinColumn
} from "typeorm";

// Importações de tipo (só para o TypeScript, não vira código JS)
import type { Funcionario } from "./Funcionario.js";
import type { FuncionariosConvidados } from "./FuncionariosConvidados.js";
import type { Notificacao } from "./Notificacao.js";

// Importações reais (usadas nos decorators)
import { Funcionario as FuncionarioEntity } from "./Funcionario.js";
import { FuncionariosConvidados as FuncionariosConvidadosEntity } from "./FuncionariosConvidados.js";
import { Notificacao as NotificacaoEntity } from "./Notificacao.js";

@Entity("Evento_treinamento") // Nome da tabela
export class EventoTreinamento {
  @PrimaryGeneratedColumn({ name: "evento_ID" })
  evento_ID!: number;

  @Column({ name: "titulo", type: "varchar", length: 100 })
  titulo!: string;

  @Column({ name: "descricao", type: "longtext", nullable: true })
  descricao?: string;

  @Column({ name: "dataHora", type: "datetime" })
  dataHora!: Date;

  @Column({ name: "duracao_horas", type: "float" })
  duracao_horas!: number;

  @Column({ name: "evento_link", type: "longtext", nullable: true })
  evento_link?: string;

  @Column({ name: "status", type: "varchar", length: 20 })
  status!: string;

  @ManyToOne(
    () => FuncionarioEntity,
    (funcionario: Funcionario) => funcionario.eventosOrganizados
  )
  @JoinColumn({ name: "organizador_ID" }) // Nome da chave estrangeira
  organizador_ID!: Funcionario;

  @OneToMany(
    () => FuncionariosConvidadosEntity,
    (fc: FuncionariosConvidados) => fc.evento
  )
  convidados?: FuncionariosConvidados[];

  @OneToMany(
    () => NotificacaoEntity,
    (notificacao: Notificacao) => notificacao.evento
  )
  notificacoes?: Notificacao[];
}