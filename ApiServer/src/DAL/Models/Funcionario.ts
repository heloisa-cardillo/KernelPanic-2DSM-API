import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Unique,
} from "typeorm";

// Importação só para tipagem (TypeScript)
import type { Cliente } from "./Cliente.js";
import type { AgendamentoInteracao } from "./AgendamentoInteracao.js";
import type { InteracaoCliente } from "./InteracaoCliente.js";
import type { Vendas } from "./Vendas.js";
import type { EventoTreinamento } from "./EventoTreinamento.js";
import type { FuncionariosConvidados } from "./FuncionariosConvidados.js";
import type { Funcionario as FuncionarioType } from "./Funcionario.js"; // para recursivo

// Importação real usada nos decorators (TypeORM)
import { Cliente as ClienteEntity } from "./Cliente.js";
import { AgendamentoInteracao as AgendamentoEntity } from "./AgendamentoInteracao.js";
import { InteracaoCliente as InteracaoEntity } from "./InteracaoCliente.js";
import { Vendas as VendasEntity } from "./Vendas.js";
import { EventoTreinamento as EventoEntity } from "./EventoTreinamento.js";
import { FuncionariosConvidados as ConvidadosEntity } from "./FuncionariosConvidados.js";
import { Funcionario as FuncionarioEntity } from "./Funcionario.js";

@Entity()
@Unique(["email"])
export class Funcionario {
  @PrimaryGeneratedColumn({ type: "int" })
  funcionario_ID!: number; // Tipo explícito: number (ID gerado automaticamente)

  @Column({ type: "varchar", length: 100 })
  nome!: string; // Tipo explícito: string

  @Column({ type: "varchar", length: 10 })
  genero!: string; // Tipo explícito: string

  @Column({ type: "varchar", length: 255 })
  endereco!: string; // Tipo explícito: string

  @Column({ type: "varchar", length: 20 })
  numero_telefone!: string; // Tipo explícito: string

  @Column({ type: "varchar", length: 50 })
  cargo!: string; // Tipo explícito: string

  @Column({ type: "varchar", length: 50 })
  email!: string; // Tipo explícito: string

  @Column({ type: "varchar", length: 255 })
  senha_hash!: string; // Tipo explícito: string

  @Column({ type: "varchar", length: 255 })
  nivel_acesso!: string; // Tipo explícito: string

  @Column({ type: "varchar", length: 100 })
  localizacao_funcionario!: string; // Tipo explícito: string

  @ManyToOne(
    () => FuncionarioEntity,
    (gerente: FuncionarioType) => gerente.subordinados,
    { nullable: true }
  )
  gerente?: FuncionarioType; // Tipo explícito: FuncionarioType | undefined (nullable)

  @OneToMany(
    () => FuncionarioEntity,
    (funcionario: FuncionarioType) => funcionario.gerente
  )
  subordinados?: FuncionarioType[]; // Tipo explícito: FuncionarioType[] | undefined (nullable)

  @OneToMany(
    () => ClienteEntity,
    (cliente: Cliente) => cliente.funcionario
  )
  clientes?: Cliente[]; // Tipo explícito: Cliente[] | undefined (nullable)

  @OneToMany(
    () => AgendamentoEntity,
    (agendamento: AgendamentoInteracao) => agendamento.funcionario
  )
  agendamentos?: AgendamentoInteracao[]; // Tipo explícito: AgendamentoInteracao[] | undefined (nullable)

  @OneToMany(
    () => InteracaoEntity,
    (interacao: InteracaoCliente) => interacao.funcionario
  )
  interacoes?: InteracaoCliente[]; // Tipo explícito: InteracaoCliente[] | undefined (nullable)

  @OneToMany(
    () => VendasEntity,
    (venda: Vendas) => venda.funcionario
  )
  vendas?: Vendas[]; // Tipo explícito: Vendas[] | undefined (nullable)

  @OneToMany(
    () => EventoEntity,
    (evento: EventoTreinamento) => evento.organizador
  )
  eventosOrganizados?: EventoTreinamento[]; // Tipo explícito: EventoTreinamento[] | undefined (nullable)

  @OneToMany(
    () => ConvidadosEntity,
    (convite: FuncionariosConvidados) => convite.funcionario
  )
  convites?: FuncionariosConvidados[]; // Tipo explícito: FuncionariosConvidados[] | undefined (nullable)
}