import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";

// Importações de tipo (só para o TypeScript, não vira código JS)
import type { Funcionario } from "./Funcionario.js";
import type { FuncionariosConvidados } from "./FuncionariosConvidados.js";
import type { Notificacao } from "./Notificacao.js";

// Importações reais (usadas nos decorators)
import { Funcionario as FuncionarioEntity } from "./Funcionario.js";
import { FuncionariosConvidados as FuncionariosConvidadosEntity } from "./FuncionariosConvidados.js";
import { Notificacao as NotificacaoEntity } from "./Notificacao.js";

@Entity()
export class EventoTreinamento {
  @PrimaryGeneratedColumn({ type: "int" })
  evento_ID!: number; // Tipo explícito: number (ID gerado automaticamente)

  @Column({ type: "varchar", length: 100 })
  titulo!: string; // Tipo explícito: string

  @Column({ type: "longtext", nullable: true })
  descricao?: string; // Tipo explícito: string | undefined (nullable)

  @Column({ type: "timestamp" })
  data_inicio!: Date; // Tipo explícito: Date

  @Column({ type: "float" })
  duracao_horas!: number; // Tipo explícito: number

  @Column({ type: "longtext" })
  evento_link!: string; // Tipo explícito: string

  @Column({ type: "varchar", length: 20 })
  status!: string; // Tipo explícito: string

  @ManyToOne(
    () => FuncionarioEntity,
    (funcionario: Funcionario) => funcionario.eventosOrganizados
  )
  organizador!: Funcionario; // Tipo explícito: Funcionario

  @OneToMany(
    () => FuncionariosConvidadosEntity,
    (fc: FuncionariosConvidados) => fc.evento
  )
  convidados?: FuncionariosConvidados[]; // Tipo explícito: FuncionariosConvidados[] | undefined (nullable)

  @OneToMany(
    () => NotificacaoEntity,
    (notificacao: Notificacao) => notificacao.evento
  )
  notificacoes?: Notificacao[]; // Tipo explícito: Notificacao[] | undefined (nullable)
}