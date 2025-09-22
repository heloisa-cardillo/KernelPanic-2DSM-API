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
  @PrimaryGeneratedColumn()
  evento_ID!: number;

  @Column({ length: 100 })
  titulo!: string;

  @Column({ type: "longtext", nullable: true })
  descricao?: string;

  @Column()
  data_inicio!: Date;

  @Column({ type: "float" })
  duracao_horas!: number;

  @Column({ type: "longtext" })
  evento_link!: string;

  @Column({ length: 20 })
  status!: string;

  @ManyToOne(
    () => FuncionarioEntity,
    f => f.eventosOrganizados
  )
  organizador!: Funcionario;

  @OneToMany(
    () => FuncionariosConvidadosEntity,
    fc => fc.evento
  )
  convidados?: FuncionariosConvidados[];

  @OneToMany(
    () => NotificacaoEntity,
    notificacao => notificacao.evento
  )
  notificacoes?: Notificacao[];
}